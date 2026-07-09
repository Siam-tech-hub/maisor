import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="text-6xl font-bold text-bottle-900">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-3 text-ink/60">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-bottle-900 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
