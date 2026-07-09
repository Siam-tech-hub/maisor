"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/products";
import Link from "next/link";

// 👇 Web3Forms access key — order emails go to siamhossai5599@gmail.com
const WEB3FORMS_ACCESS_KEY = "67b975da-a7b9-40b8-b643-94b59e2002c2";

// 👇 Payment numbers (bKash & Nagad)
const BKASH_NUMBER = "01337303324";
const NAGAD_NUMBER = "01337303324";

const CITIES = ["Dhaka", "Outside Dhaka"];

// 👇 Bangladesh mobile number validation: 01 followed by 3-9, then 8 digits = 11 digits
function isBangladeshPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^01[3-9]\d{8}$/.test(cleaned);
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; txn?: string }>({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Dhaka",
    payment: "COD",
    txn: "", // transaction ID for bKash/Nagad
    note: "",
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    // Clear error when user edits
    if (key === "phone") {
      setErrors((e) => ({ ...e, phone: undefined }));
    }
    if (key === "txn") {
      setErrors((e) => ({ ...e, txn: undefined }));
    }
  }

  const shipping = subtotal >= 3000 ? 0 : form.city === "Dhaka" ? 60 : 130;
  const total = subtotal + shipping;

  const needsPayment = form.payment === "bKash" || form.payment === "Nagad";
  const paymentNumber = form.payment === "bKash" ? BKASH_NUMBER : NAGAD_NUMBER;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // ---- Validate phone number ----
    const newErrors: { phone?: string; txn?: string } = {};
    if (!isBangladeshPhone(form.phone)) {
      newErrors.phone = "Please enter a valid Bangladesh mobile number (11 digits, starting with 01)";
    }
    // ---- Validate transaction ID for bKash/Nagad ----
    if (needsPayment && !form.txn.trim()) {
      newErrors.txn = "Please enter your payment Transaction ID after sending money";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSending(true);

    const orderId = "MAI-" + Date.now().toString().slice(-6);

    // ---- Build order details for the email ----
    const emailBody = items
      .map(
        (i) =>
          `${i.name} — Size ${i.size} — Qty ${i.qty} — ${formatPrice(
            i.price * i.qty
          )}`
      )
      .join("\n");

    // ---- Send email notification to siamhossai5599@gmail.com ----
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `🛍️ New Maisor Order ${orderId} — ${formatPrice(total)}`,
          from_name: "Maisor Store",
          name: form.name,
          phone: form.phone,
          address: form.address,
          area: form.city,
          payment: form.payment,
          payment_number: needsPayment ? paymentNumber : "—",
          transaction_id: needsPayment ? form.txn : "—",
          note: form.note || "—",
          order_id: orderId,
          order_items: emailBody,
          subtotal: formatPrice(subtotal),
          delivery: shipping === 0 ? "FREE" : formatPrice(shipping),
          total: formatPrice(total),
        }),
      });
    } catch (err) {
      console.error("Email send failed", err);
    }

    setSending(false);
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
          Thank you for your order. We&apos;ve received your details and our team
          will contact you shortly to confirm.
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
          Add a few pieces and they&apos;ll show up here.
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
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                  Phone number
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="01XXXXXXXXX"
                  maxLength={11}
                  className={`mt-2 w-full rounded-xl border bg-cream px-4 py-3 text-sm outline-none focus:border-bottle-500 ${
                    errors.phone ? "border-red-500" : "border-black/15"
                  }`}
                />
                {errors.phone ? (
                  <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
                ) : (
                  <p className="mt-1.5 text-xs text-ink/40">
                    Must be a valid Bangladesh number (starts with 01, 11 digits)
                  </p>
                )}
              </div>
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

            {/* bKash / Nagad payment instructions */}
            {needsPayment && (
              <div className="mt-4 rounded-2xl border border-bottle-300 bg-bottle-50 p-5">
                <h3 className="text-sm font-bold text-bottle-900">
                  How to pay with {form.payment}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-bottle-800">
                  Send <strong>{formatPrice(total)}</strong> to this{" "}
                  {form.payment} number:
                </p>

                {/* The number - easy to copy */}
                <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-4 py-3">
                  <span className="text-lg font-bold tracking-wider text-bottle-900">
                    {paymentNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard
                        ?.writeText(paymentNumber)
                        .catch(() => {});
                    }}
                    className="rounded-lg bg-bottle-900 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-bottle-700"
                  >
                    Copy
                  </button>
                </div>

                <ol className="mt-4 space-y-2 text-xs leading-relaxed text-bottle-800">
                  <li>
                    <strong>1.</strong> Dial{" "}
                    <strong>{form.payment === "bKash" ? "*247#" : "*167#"}</strong>{" "}
                    or open your {form.payment} app
                  </li>
                  <li>
                    <strong>2.</strong> Select{" "}
                    <strong>Send Money</strong>
                  </li>
                  <li>
                    <strong>3.</strong> Enter the number above &amp; amount{" "}
                    <strong>{formatPrice(total)}</strong>
                  </li>
                  <li>
                    <strong>4.</strong> Complete the payment &amp; copy your{" "}
                    <strong>Transaction ID</strong>
                  </li>
                  <li>
                    <strong>5.</strong> Paste the Transaction ID below &amp; place
                    your order
                  </li>
                </ol>
              </div>
            )}

            {/* Transaction ID field (only for bKash/Nagad) */}
            {needsPayment && (
              <div className="mt-4">
                <Field
                  label={`${form.payment} Transaction ID`}
                  value={form.txn}
                  onChange={(v) => set("txn", v)}
                  placeholder="e.g. 9X4ABCD12E"
                />
                {errors.txn && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.txn}</p>
                )}
              </div>
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
            disabled={sending}
            className="mt-6 w-full rounded-full bg-bottle-900 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-bottle-700 disabled:opacity-60"
          >
            {sending ? "Placing Order…" : `Place Order — ${formatPrice(total)}`}
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
                  <div className="h-16 w-16 shrink-0 overflow-hidden bg-white ring-1 ring-black/5">
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
