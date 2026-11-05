function doGet() {
  return jsonResponse({ ok: true, message: "Enrollment Sheets endpoint is live. Submit requests through the LMS." });
}

function doPost(e) {
  let lock;
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty("SHARED_SECRET");
    const spreadsheetId = properties.getProperty("SPREADSHEET_ID");
    if (!expectedSecret || payload.secret !== expectedSecret || !spreadsheetId) {
      return jsonResponse({ ok: false });
    }

    lock = LockService.getScriptLock();
    lock.waitLock(10000);

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName("Enrollment Requests") || spreadsheet.insertSheet("Enrollment Requests");
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At", "Payment Status", "Token", "Class", "Subjects",
        "Student Name", "Phone", "School", "Board", "Academic Year",
        "City Code", "Learning Mode", "Data Consent",
      ]);
    }

    sheet.appendRow([
      payload.submittedAt || new Date().toISOString(),
      "Pending",
      payload.tokenId,
      payload.classGroup,
      payload.subjectCount,
      payload.fullName,
      payload.phone,
      payload.school,
      payload.board,
      payload.academicYear,
      payload.cityCode,
      payload.learningMode,
      payload.consent === true ? "Yes" : "No",
    ]);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
