export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center gap-4 sm:gap-6 p-8 sm:p-12 md:p-16 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black dark:text-zinc-50 text-center">
          Contact
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 text-center leading-relaxed">
          Get in touch with us. We would love to hear from you!
        </p>
      </main>
    </div>
  );
}
