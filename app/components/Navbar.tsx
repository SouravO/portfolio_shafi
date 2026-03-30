import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-16 py-4 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
      <Link href="/" className="text-xl font-semibold text-black dark:text-zinc-50">
        Shafi Shoukath
      </Link>
      <div className="flex gap-6">
        <Link
          href="/"
          className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
        >
          About Me
        </Link>
        <Link
          href="/store"
          className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
        >
          Store
        </Link>
        <Link
          href="/blog"
          className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
        >
          Blog
        </Link>
        <Link
          href="/media"
          className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
        >
          Media
        </Link>
        <Link
          href="/projects"
          className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50"
        >
          Projects
        </Link>
      </div>
    </nav>
  );
}
