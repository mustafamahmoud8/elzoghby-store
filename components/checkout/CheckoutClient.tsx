"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatEGP, priceValue, useBag, itemOf } from "@/components/rack/bag";

type PaymentMethod = "cod" | "visa" | "mastercard" | "fawry";

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; icon: string }[] = [
  { value: "cod", label: "الدفع عند الاستلام", icon: "💵" },
  { value: "visa", label: "Visa", icon: "💳" },
  { value: "mastercard", label: "Mastercard", icon: "💳" },
  { value: "fawry", label: "فوري", icon: "🔵" },
];

export default function CheckoutClient() {
  const bag = useBag();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    payment: "cod" as PaymentMethod,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const shipping = 50;
  const total = bag.subtotal + (bag.lines.length > 0 ? shipping : 0);

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!/^(010|011|012|015)\d{8}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "رقم هاتف مصري غير صحيح (مثال: 01093421310)";
    if (!form.address.trim()) errs.address = "العنوان مطلوب";
    if (!form.city.trim()) errs.city = "المدينة مطلوبة";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    bag.clear();
  };

  if (submitted) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#ebe8e3] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-green-100 text-4xl">✅</div>
          <h2 className="mb-2 font-serif text-3xl font-bold italic text-[#3d2b1f]">تم الطلب!</h2>
          <p className="mb-1 text-stone-600">شكراً لك، {form.name}!</p>
          <p className="mb-6 text-sm text-stone-500">
            سيتم التواصل معك على <span className="font-bold">{form.phone}</span> لتأكيد الطلب.
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full rounded-full bg-[#3d2b1f] py-3 text-sm font-bold text-white transition hover:bg-[#5a3e2b]"
          >
            العودة للمتجر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#ebe8e3] px-4 py-10" dir="rtl">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/hanger.png" alt="" className="mx-auto mb-3 size-12" />
          <h1 className="leading-none text-[#3d2b1f]">
            <span className="block text-xs font-extrabold tracking-[0.4em]">ELZOGHBY</span>
            <span className="mt-1 block font-serif text-4xl font-bold italic">Store</span>
          </h1>
          <p className="mt-2 text-sm text-stone-500">إتمام الطلب</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-[#3d2b1f]">معلومات التوصيل</h2>
              <div className="space-y-4">
                <Field
                  label="الاسم الكامل"
                  type="text"
                  value={form.name}
                  error={errors.name}
                  placeholder="مصطفى محمود"
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                />
                <Field
                  label="رقم الهاتف"
                  type="tel"
                  value={form.phone}
                  error={errors.phone}
                  placeholder="01093421310"
                  onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                />
                <Field
                  label="العنوان"
                  type="text"
                  value={form.address}
                  error={errors.address}
                  placeholder="الشارع، الحي، الرقم"
                  onChange={(v) => setForm((f) => ({ ...f, address: v }))}
                />
                <Field
                  label="المدينة"
                  type="text"
                  value={form.city}
                  error={errors.city}
                  placeholder="القاهرة"
                  onChange={(v) => setForm((f) => ({ ...f, city: v }))}
                />
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-[#3d2b1f]">طريقة الدفع</h2>
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 p-3 transition ${
                      form.payment === opt.value
                        ? "border-[#3d2b1f] bg-[#3d2b1f]/5"
                        : "border-stone-200 hover:border-stone-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={form.payment === opt.value}
                      onChange={() => setForm((f) => ({ ...f, payment: opt.value }))}
                      className="sr-only"
                    />
                    <span className="text-xl">{opt.icon}</span>
                    <span className="text-sm font-bold text-[#3d2b1f]">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={bag.lines.length === 0}
              className="w-full rounded-full bg-[#3d2b1f] py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#5a3e2b] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {bag.lines.length === 0 ? "السلة فارغة" : "تأكيد الطلب ←"}
            </button>
          </form>

          {/* Order Summary */}
          <aside className="rounded-2xl bg-white p-6 shadow-sm" style={{ alignSelf: "start" }}>
            <h2 className="mb-4 font-bold text-[#3d2b1f]">ملخص الطلب</h2>

            {bag.lines.length === 0 ? (
              <p className="text-sm text-stone-400">لا توجد منتجات في السلة</p>
            ) : (
              <ul className="mb-4 space-y-3 divide-y divide-stone-100">
                {bag.lines.map((line) => {
                  const item = itemOf(line);
                  if (!item) return null;
                  return (
                    <li key={`${line.id}-${line.size}`} className="flex items-center gap-3 pt-3 first:pt-0">
                      {item.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt=""
                          className="size-12 shrink-0 rounded-lg object-contain"
                          style={{ background: "#ebe8e3" }}
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#3d2b1f]">{item.name}</p>
                        <p className="text-xs text-stone-500">
                          المقاس {line.size} · الكمية {line.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#3d2b1f]">
                        {formatEGP(priceValue(item.price) * line.quantity)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="space-y-2 border-t border-stone-100 pt-4 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>المجموع الفرعي</span>
                <span>{formatEGP(bag.subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>الشحن</span>
                <span>{bag.lines.length > 0 ? formatEGP(shipping) : "—"}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 font-bold text-[#3d2b1f]">
                <span>الإجمالي</span>
                <span>{formatEGP(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ── Helper field component ────────────────────────────────────────────────────
function Field({
  label,
  type,
  value,
  error,
  placeholder,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  error?: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-[#3d2b1f]">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#3d2b1f] focus:ring-2 focus:ring-[#3d2b1f]/20 ${
          error ? "border-red-400 bg-red-50" : "border-stone-300 bg-white"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
