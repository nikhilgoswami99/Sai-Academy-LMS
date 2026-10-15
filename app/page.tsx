import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-bold tracking-wide">
          SAI ACADEMY
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-6">
          <a
            href="#about"
            className="hidden text-sm text-neutral-600 transition hover:text-neutral-950 sm:inline"
          >
            About
          </a>
          <a
            href="#learning"
            className="hidden text-sm text-neutral-600 transition hover:text-neutral-950 sm:inline"
          >
            Learning
          </a>
          <Link
            href="/login"
            className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Sign in
          </Link>
        </nav>
      </header>

      <section
        id="about"
        className="mx-auto grid min-h-[70vh] w-full max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2"
      >
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
            Welcome to SAI Academy
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Learn with purpose.
            <span className="block text-red-700">Grow with confidence.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
            A supportive place to build knowledge, develop skills, and take the
            next step in your learning journey.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="rounded-md bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
            >
              Visit the academy portal
            </Link>
            <a
              href="#learning"
              className="rounded-md border border-neutral-300 px-5 py-3 text-sm font-semibold transition hover:bg-neutral-50"
            >
              Learn more
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-3xl bg-neutral-950 p-8 text-white sm:min-h-96"
        >
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-red-700/80 blur-3xl" />
          <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-red-900/70 blur-3xl" />
          <div className="relative max-w-sm text-center">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-red-200">
              SAI Academy
            </p>
            <p className="mt-5 text-3xl font-semibold leading-snug sm:text-4xl">
              Your learning journey starts here.
            </p>
          </div>
        </div>
      </section>

      <section id="learning" className="border-t bg-neutral-50">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
              The academy experience
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A place to keep moving forward
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
              Stay connected with the people and information that support your
              learning.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Learning",
                description:
                  "Build understanding through structured lessons and guidance.",
              },
              {
                title: "Progress",
                description:
                  "Keep track of goals, classes, and the steps ahead.",
              },
              {
                title: "Support",
                description:
                  "Connect with a community focused on helping learners grow.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 leading-6 text-neutral-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>SAI Academy</span>
          <span>Learn with purpose. Grow with confidence.</span>
        </div>
      </footer>
    </main>
  );
}
