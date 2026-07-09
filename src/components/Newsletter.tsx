"use client";

import { useState } from "react";

export default function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <div className="rounded-3xl border border-black/10 bg-white p-10 text-center sm:p-16">
      <h2 className="text-2xl font-bold sm:text-3xl">Join the Maison list</h2>
      <p className="mx-auto mt-3 max-w-md text-ink/60">
        Be first to know about new drops, restocks, and members-only offers.
      </p>
      {done ? (
        <p className="mt-8 font-medium text-bottle-700">
          Thanks for subscribing! ✦
        </p>
      ) : (
        <form
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            className="flex-1 rounded-full border border-black/15 bg-cream px-5 py-3 text-sm outline-none focus:border-bottle-500"
          />
          <button
            type="submit"
            className="rounded-full bg-bottle-900 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
