export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center gap-6 p-16 max-w-3xl">
        <h1 className="text-4xl font-semibold text-black dark:text-zinc-50">
          About Us
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center">
          This is the about page. Learn more about our company and mission.
        </p>
      </main>
    </div>
  );
}
