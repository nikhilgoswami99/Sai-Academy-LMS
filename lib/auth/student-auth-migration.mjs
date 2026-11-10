/** Stable, non-user-facing Auth identity derived only from the profile/Auth UUID. */
export function getStudentAuthEmail(profileId) {
  return `student.${profileId.toLowerCase()}@login.saiacademy.com`;
}

/** Resolve exactly as student login does: one active current-year enrollment, active profile, student role. */
export async function resolveStudentAuthByRollNumber(admin, rollNumber) {
  const { data: years, error: yearsError } = await admin
    .from("academic_years").select("id").eq("is_current", true);
  if (yearsError || !years?.length) throw new Error("Could not resolve the current academic year.");

  const { data: enrollments, error: enrollmentError } = await admin
    .from("student_enrollments").select("student_id,roll_number")
    .eq("roll_number", rollNumber).eq("status", "active")
    .in("academic_year_id", years.map(({ id }) => id)).limit(2);
  if (enrollmentError || enrollments?.length !== 1) {
    throw new Error("Roll number must have exactly one active enrollment in the current academic year.");
  }

  const { data: student, error: studentError } = await admin
    .from("students").select("*")
    .eq("id", enrollments[0].student_id).maybeSingle();
  if (studentError || !student || typeof student.profile_id !== "string") {
    throw new Error("Student profile link could not be resolved.");
  }

  const { data: profile, error: profileError } = await admin
    .from("profiles").select("id,status").eq("id", student.profile_id).maybeSingle();
  if (profileError || !profile || profile.id !== student.profile_id || profile.status !== "active") {
    throw new Error("The linked student profile is missing or inactive.");
  }

  const { data: assignments, error: assignmentsError } = await admin
    .from("user_roles").select("role_id").eq("user_id", student.profile_id);
  if (assignmentsError || !assignments?.length) throw new Error("The student role could not be verified.");
  const { data: roles, error: rolesError } = await admin
    .from("roles").select("name").in("id", assignments.map(({ role_id }) => role_id));
  if (rolesError || !roles?.some(({ name }) => name === "student")) {
    throw new Error("The linked profile does not have the student role.");
  }

  return {
    studentId: String(student.id),
    profileId: student.profile_id,
    rollNumber: enrollments[0].roll_number,
    studentName: [student.full_name, student.name, student.student_name].find((value) => typeof value === "string") ?? "Student",
  };
}

/** Idempotently update one existing Auth user and verify its identity afterward. */
export async function migrateStudentAuthProfile(admin, profileId, knownEmailOwners) {
  const { data, error } = await admin.auth.admin.getUserById(profileId);
  const user = data?.user;
  if (error || !user || user.id !== profileId) return { status: "failed" };

  const targetEmail = getStudentAuthEmail(profileId);
  let owners = knownEmailOwners;
  if (!owners) {
    owners = new Map();
    for (let page = 1; ; page += 1) {
      const { data: pageData, error: listError } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
      if (listError || !pageData?.users) return { status: "failed", user, targetEmail };
      for (const candidate of pageData.users) {
        if (candidate.email) owners.set(candidate.email.toLowerCase(), candidate.id);
      }
      if (pageData.users.length < 1000) break;
    }
  }

  const owner = owners.get(targetEmail.toLowerCase());
  if (owner && owner !== profileId) return { status: "conflict", user, targetEmail };
  if (user.email?.toLowerCase() === targetEmail.toLowerCase() && user.email_confirmed_at) {
    return { status: "already_migrated", user, targetEmail };
  }

  const { error: updateError } = await admin.auth.admin.updateUserById(profileId, {
    email: targetEmail,
    email_confirm: true,
  });
  if (updateError) return { status: "failed", user, targetEmail };

  const { data: verifiedData, error: verifyError } = await admin.auth.admin.getUserById(profileId);
  const verifiedUser = verifiedData?.user;
  if (verifyError || !verifiedUser || verifiedUser.id !== profileId ||
      verifiedUser.email?.toLowerCase() !== targetEmail.toLowerCase() || !verifiedUser.email_confirmed_at) {
    return { status: "failed", user, targetEmail };
  }
  owners.set(targetEmail.toLowerCase(), profileId);
  return { status: "migrated", user: verifiedUser, targetEmail };
}
