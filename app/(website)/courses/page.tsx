import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <article className="relative flex min-h-[28vh] flex-col justify-center overflow-hidden rounded-3xl border border-border bg-card px-5 py-4 shadow-[0_24px_70px_-30px_rgba(16,47,104,0.3)] sm:px-7 sm:py-6 lg:px-9 lg:py-8">
          <div
            className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-secondary/70"
            aria-hidden="true"
          />
          <div className="relative mx-auto w-full max-w-5xl">
            <div className="mb-6 flex items-center justify-start">
              <Image
                src="/academy-logo.png"
                alt="SAI Academy logo"
                width={136}
                height={136}
                className="shrink-0"
              />
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-brand-red">आओ</span>{" "}
              <span className="text-brand-blue">REVISE</span>{" "}
              <span className="text-brand-red">करें</span>
            </h1>
            </div>
            
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.17em] text-brand-blue sm:text-base">
              Crash Course
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Revisit key concepts, strengthen your understanding, and prepare
              for your upcoming examinations.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                nativeButton={false}
                size="lg"
                render={<Link href="/courses/crash-course" />}
                className="h-12 rounded-md px-6 text-sm font-semibold"
              >
                Details
              </Button>
            </div>
          </div>
        </article>

        <section
          aria-labelledby="crash-course-details-title"
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_70px_-30px_rgba(16,47,104,0.18)]"
        >
          <header className="border-b border-border px-4 py-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Teaching Crash Course since 2005
            </p>
            <h2
              id="crash-course-details-title"
              className="mt-1 text-xl font-bold tracking-tight sm:text-2xl"
            >
              SAI ACADEMY Crash Course 2026–27
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              CC Page · Class XII
            </p>
          </header>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs sm:text-sm [&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2 sm:[&_th]:px-4 sm:[&_td]:px-4">
              <thead>
                <tr className="bg-secondary/50 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  <th
                    scope="col"
                    className="w-[36%] px-5 py-4 font-semibold sm:px-8"
                  >
                    Facilities
                  </th>
                  <th
                    scope="col"
                    className="w-[32%] px-5 py-4 font-semibold sm:px-8"
                  >
                    Academics
                  </th>
                  <th
                    scope="col"
                    className="w-[32%] px-5 py-4 font-semibold text-brand-red sm:px-8"
                  >
                    Crash Course
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <th scope="row" className="px-5 py-4 font-semibold sm:px-8">
                    1. Fees
                  </th>
                  <td className="px-5 py-4 sm:px-8">Pay Monthly</td>
                  <td className="px-5 py-4 font-semibold sm:px-8">Pay ONCE</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-5 py-4 align-top font-semibold sm:px-8"
                  >
                    2. Classes
                  </th>
                  <td className="px-5 py-4 sm:px-8">
                    <ul className="space-y-1">
                      <li>
                        <span className="font-medium">Academic:</span> 3 hrs
                        p.s.p.w
                      </li>
                      <li>
                        <span className="font-medium">Crash Course:</span>{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          [NO]
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">A+:</span> ₹ 200 p.s.p.m
                      </li>
                      <li>
                        <span className="font-medium">Basic:</span> ₹ 200
                        p.s.p.m
                      </li>
                      <li>
                        <span className="font-medium">Afternoon Classes:</span>{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          [NO]
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">B-Batch:</span>{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          [NO]
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">A-Batch:</span>{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          [NO]
                        </span>
                      </li>
                    </ul>
                  </td>
                  <td className="px-5 py-4 sm:px-8">
                    <ul className="space-y-1">
                      <li>
                        <span className="font-medium">Academic:</span> 3 hrs
                        p.s.p.w
                      </li>
                      <li>
                        <span className="font-medium">Crash Course:</span> 3 hrs
                        p.s.p.w
                      </li>
                      <li>
                        <span className="font-medium">A+:</span> ₹ 100 p.s.p.m
                      </li>
                      <li>
                        <span className="font-medium">Basic:</span> ₹ 100
                        p.s.p.m
                      </li>
                      <li>
                        <span className="font-medium">Afternoon Classes:</span>{" "}
                        <span className="font-semibold text-green-700 dark:text-green-400">
                          YES
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">B-Batch:</span> 2hrs
                        classes
                      </li>
                      <li>
                        <span className="font-medium">A-Batch:</span> 2hrs
                        classes
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-4 font-semibold sm:px-8">
                    3. Evening Classes
                  </th>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      YES
                    </span>{" "}
                    [ Academics ]
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      YES
                    </span>{" "}
                    [ Academics + CC ]
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-5 py-4 align-top font-semibold sm:px-8"
                  >
                    4. Teachers
                  </th>
                  <td className="px-5 py-4">
                    All Senior Teachers
                    <br />
                    <span className="font-semibold text-brand-red">
                      [ 7 BEST ]
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    Senior Teachers + Assistant Teacher + Paper Makers +
                    Invigilators + Copy Checkers + Librarian + Class Teachers
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-5 py-4 align-top font-semibold sm:px-8"
                  >
                    5. Benefits
                  </th>
                  <td className="px-5 py-4 sm:px-8">
                    <ul className="space-y-1.5">
                      <li>
                        <span className="font-medium">a) Library:</span>{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          [NO]
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">
                          b) 90 Important Questions:
                        </span>{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          [NO]
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">
                          c) 50 Most Important Questions Pack:
                        </span>{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          [NO]
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">
                          d) 100 Numerical Important Questions Pack:
                        </span>{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          [NO]
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">
                          e) Last 25 Years Board Paper Practice:
                        </span>{" "}
                        Monthly Academic Class
                      </li>
                      <li>
                        <span className="font-medium">
                          f) 100 HOTS Questions Pack:
                        </span>{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          [NO]
                        </span>
                      </li>
                      <li>
                        <span className="font-medium">g) MTP Books:</span>{" "}
                        <span className="font-semibold text-red-600 dark:text-red-400">
                          [NO]
                        </span>
                      </li>
                    </ul>
                  </td>
                  <td className="px-5 py-4 sm:px-8">
                    <ul className="space-y-1.5">
                      <li>
                        <span className="font-medium">a) Library:</span>{" "}
                        <span className="font-semibold text-green-700 dark:text-green-400">
                          YES
                        </span>
                        (B-Batch, C-Batch)
                      </li>
                      <li>
                        <span className="font-medium">
                          b) 90 Important Questions:
                        </span>{" "}
                        —
                      </li>
                      <li>
                        <span className="font-medium">
                          c) 50 Most Important Questions Pack:
                        </span>{" "}
                        —
                      </li>
                      <li>
                        <span className="font-medium">
                          d) 100 Numerical Important Questions Pack:
                        </span>{" "}
                        A-Batch
                      </li>
                      <li>
                        <span className="font-medium">
                          e) Last 25 Years Board Paper Practice:
                        </span>{" "}
                        Monthly Academic Class
                      </li>
                      <li>
                        <span className="font-medium">
                          f) 100 HOTS Questions Pack:
                        </span>{" "}
                        A-Batch
                      </li>
                      <li>
                        <span className="font-medium">g) MTP Books:</span>{" "}
                        Afternoon Class Practice
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-4 font-semibold sm:px-8">
                    6. CC SATS
                  </th>
                  <td className="px-5 py-4">
                    ₹ 500 (1), ₹ 900 (2), ₹ 1,200 (3), ₹ 1,500 (4), ₹ 1,600 (5)
                  </td>
                  <td className="px-5 py-4">₹ 100 per student (Photocopy)</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-5 py-4 align-top font-semibold sm:px-8"
                  >
                    7. Website
                    <span className="mt-1 block font-normal text-muted-foreground">
                      Online Content (Digital Notes + Recorded Lectures +
                      Important Question Papers)
                    </span>
                  </th>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      [NO]
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      YES
                    </span>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-5 py-4 align-top font-semibold sm:px-8"
                  >
                    8. Goal
                  </th>
                  <td className="px-5 py-4">
                    Just Pass
                    <br />
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      NO
                    </span>{" "}
                    Goal
                  </td>
                  <td className="px-5 py-4">
                    <p className="mb-2">Choose anyone:</p>
                    <ul className="flex flex-wrap gap-1">
                      {[
                        "Just Pass",
                        "60+",
                        "70+",
                        "80+",
                        "90+",
                        "Class Topper",
                        "SCHOOL TOPPER",
                      ].map((goal) => (
                        <li
                          key={goal}
                          className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium"
                        >
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <aside className="border-t border-border bg-secondary/20 px-4 py-4 sm:px-6">
            <h3 className="font-semibold">NOTE</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm leading-5 text-muted-foreground">
              <li>Collect your Crash Course tips page from office.</li>
              <li>Deposit your GOAL-SLIP to office.</li>
              <li>
                Note down dates &amp; syllabus of CC SATS from notice board.
              </li>
              <li>Get your fees slip and CC SATS ADMIT CARD from office.</li>
              <li>Consult office for addition of subjects.</li>
              <li>Pay A+ fees / photocopy amount separately at the office.</li>
              <li>
                Visit website -{" "}
                <a
                  href="https://www.snehacademy.com"
                  className="font-medium text-brand-blue underline underline-offset-4"
                >
                  www.snehacademy.com
                </a>
                . Get your DIWALI OFFER-GIFT TOKEN 1 and deposit your fees
                either offline or online.
              </li>
            </ol>
          </aside>
        </section>
      </div>
    </main>
  );
}
