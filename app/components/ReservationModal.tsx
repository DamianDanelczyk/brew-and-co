"use client";

import { useEffect, useState } from "react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success";

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const today = new Date().toISOString().split("T")[0];

  // Body scroll lock + Escape key
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", handler);
    };
  }, [isOpen, onClose]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setFormState("idle"), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 600);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(28, 15, 7, 0.6)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-8 shadow-xl"
        style={{ backgroundColor: "#F8F1E6" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-150"
          style={{ color: "#9E6B52" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EAD9C1")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {formState === "success" ? (
          /* Success state */
          <div className="text-center py-4">
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4"
              style={{ backgroundColor: "#D9ECDA" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#4A7C45" strokeWidth="2" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2
              id="modal-title"
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display)", color: "#1C0F07" }}
            >
              You&apos;re booked in!
            </h2>
            <p className="text-base mb-8" style={{ color: "#6B4433" }}>
              We&apos;ve reserved your spot! We&apos;ll see you soon.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-200"
              style={{ backgroundColor: "#C96235" }}
            >
              Close
            </button>
          </div>
        ) : (
          /* Form state */
          <>
            <h2
              id="modal-title"
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "#1C0F07" }}
            >
              Reserve a Table
            </h2>
            <p className="text-sm mb-6" style={{ color: "#9E6B52" }}>
              We&apos;ll hold a spot just for you at 12 Redchurch Street.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#3D1F10" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-shadow duration-150"
                  style={{
                    border: "1.5px solid #E2CBAD",
                    backgroundColor: "#FFFFFF",
                    color: "#1C0F07",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#C96235";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,98,53,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E2CBAD";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#3D1F10" }}>
                  Party Size
                </label>
                <select
                  required
                  className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-shadow duration-150 appearance-none"
                  style={{
                    border: "1.5px solid #E2CBAD",
                    backgroundColor: "#FFFFFF",
                    color: "#1C0F07",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#C96235";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,98,53,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E2CBAD";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <option value="">Select party size</option>
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#3D1F10" }}>
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  min={today}
                  className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-shadow duration-150"
                  style={{
                    border: "1.5px solid #E2CBAD",
                    backgroundColor: "#FFFFFF",
                    color: "#1C0F07",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#C96235";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,98,53,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E2CBAD";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#3D1F10" }}>
                  Preferred Time
                </label>
                <input
                  type="time"
                  required
                  className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-shadow duration-150"
                  style={{
                    border: "1.5px solid #E2CBAD",
                    backgroundColor: "#FFFFFF",
                    color: "#1C0F07",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#C96235";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,98,53,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#E2CBAD";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full py-3 rounded-full font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                style={{ backgroundColor: formState === "submitting" ? "#B55228" : "#C96235" }}
              >
                {formState === "submitting" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Reserving...
                  </>
                ) : (
                  "Reserve My Table"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
