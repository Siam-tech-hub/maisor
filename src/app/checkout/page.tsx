"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/products";
import Link from "next/link";

// 👇 Replace with your WhatsApp number (country code, no +, no spaces)
const WHATSAPP_NUMBER = "8801XXXXXXXXX";

const CITIES = ["Dhaka", "Outside Dhaka"];

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Dhaka",
    payment: "COD",
    note: "",
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const shipping =
    subtotal >= 3000 ? 0 : form.city === "Dhaka" ? 60 : 130;
  const total = subtotal + shipping;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lines = items
      .map(
        (i) =>
          `• ${i.name} (Size ${i.size}) ×${i.qty} — ${formatPrice(
            i.price * i.qty
          )}`
      )
      .join("\n");

    const message =
      `*New Maisor Order*\n\n` +
      `${lines}\n\n` +
      `Subtotal: ${formatPrice(subtotal)}\n` +
      `Delivery: ${shipping === 0 ? "FREE" : formatPrice(shipping)}\n` +
      `Total: ${formatPrice(total)}\n\n` +
      `*Customer*\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Address: ${form.address}\n` +
      `Area: ${form.city}\n` +
      `Payment: ${form.payment}\n` +
      (form.note ? `Note: ${form.note}\n` : "");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
    setPlaced(true);
    clear();
  }

  // Success screen
  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bottle-900 text-2xl text-white">
          ✓
        </div>
        <h1 className="mt-6 text-3xl font-bold">Order placed!</h1>
        <p className="mt-4 leading-relaxed text-ink/60">
          We've opened WhatsApp with your order details. If it didn't open
          automatically, just send us a message and we'll confirm your order
          right away.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-bottle-900 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-4 text-ink/60">
          Add a few pieces and they'll show up here.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-bottle-900 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-5">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3">
          <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold">Delivery details</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field
                label="Full name"
                value={form.name}
                onChange={(v) => set("name", v)}
                placeholder="Your name"
              />
              <Field
                label="Phone number"
                type="tel"
                value={form.phone}
                onChange={(v) => set("phone", v)}
                placeholder="01XXXXXXXXX"
              />
            </div>
            <div className="mt-4">
              <Field
                label="Full address"
                value={form.address}
                onChange={(v) => set("address", v)}
                placeholder="House, road, area"
              />
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                Area
              </label>
              <div className="mt-2 flex gap-3">
                {CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => set("city", c)}
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                      form.city === c
                        ? "border-bottle-900 bg-bottle-900 text-white"
                        : "border-black/15 text-ink/70 hover:border-bottle-500"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment */}
            <h2 className="mt-8 text-lg font-bold">Payment method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["COD", "bKash", "Nagad"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => set("payment", m)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                    form.payment === m
                      ? "border-bottle-900 bg-bottle-900 text-white"
                      : "border-black/15 text-ink/70 hover:border-bottle-500"
                  }`}
                >
                  {m === "COD" ? "Cash on Delivery" : m}
                </button>
              ))}
            </div>
            {form.payment !== "COD" && (
              <p className="mt-3 rounded-lg bg-bottle-50 px-4 py-3 text-xs text-bottle-800">
                You selected <strong>{form.payment}</strong>. We'll share payment
                instructions via WhatsApp after you place the order.
              </p>
            )}

            <div className="mt-4">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                Order note (optional)
              </label>
              <textarea
                rows={3}
                value={form.note}
                onChange={(e) => set("note", e.target.value)}
                placeholder="Anything we should know?"
                className="mt-2 w-full rounded-xl border border-black/15 bg-cream px-4 py-3 text-sm outline-none focus:border-bottle-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-bottle-900 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700"
          >
            Place Order — {formatPrice(total)}
          </button>
        </form>

        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-3xl border border-black/10 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-bold">Order summary</h2>
            <div className="mt-4 space-y-4">
              {items.map((i) => (
                <div
                  key={`${i.id}-${i.size}`}
                  className="flex gap-3 border-b border-black/5 pb-4"
                >
                  <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={i.image}
                      alt={i.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-medium">{i.name}</p>
                    <p className="text-xs text-ink/50">
                      Size {i.size} · ×{i.qty}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    {formatPrice(i.price * i.qty)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row
                label="Delivery"
                value={shipping === 0 ? "FREE" : formatPrice(shipping)}
                accent={shipping === 0}
              />
              <div className="my-3 border-t border-black/10" />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {subtotal < 3000 && (
              <p className="mt-4 rounded-lg bg-bottle-50 px-4 py-3 text-xs text-bottle-800">
                Add {formatPrice(3000 - subtotal)} more for{" "}
                <strong>free delivery</strong>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
        {label}
      </label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-black/15 bg-cream px-4 py-3 text-sm outline-none focus:border-bottle-500"
      />
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink/60">{label}</span>
      <span className={accent ? "font-semibold text-bottle-700" : ""}>
        {value}
      </span>
    </div>
  );
}
