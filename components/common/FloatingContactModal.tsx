"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import { formAPI } from "@/utils/fetch-api";

interface FloatingContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FloatingContactModal({
  isOpen,
  onClose,
}: FloatingContactModalProps) {
  const t = useTranslations("QuoteForm");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    position: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("company", formData.companyName);
      data.append("position", formData.position);
      data.append("message", formData.message);

      const resData = await formAPI("/submitInquiry", data);
      if (resData) {
        window.location.assign("/request-quote/success");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting your inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/20 bg-white/90 shadow-2xl backdrop-blur-md">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Request Quote</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-2xl text-gray-400 hover:text-gray-600"
              aria-label="Close request quote form"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm text-black">
                  {t("labels.name")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:bg-white focus:outline-none"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-black">
                  {t("labels.email")} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:bg-white focus:outline-none"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      email: event.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block text-sm text-black">
                  {t("labels.phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:bg-white focus:outline-none"
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      phone: event.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label htmlFor="position" className="mb-1 block text-sm text-black">
                  {t("labels.position")}
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:bg-white focus:outline-none"
                  value={formData.position}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      position: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="companyName" className="mb-1 block text-sm text-black">
                {t("labels.companyName")}
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:bg-white focus:outline-none"
                value={formData.companyName}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    companyName: event.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm text-black">
                {t("labels.message")} <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:bg-white focus:outline-none"
                value={formData.message}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    message: event.target.value,
                  }))
                }
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-red-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-800 disabled:opacity-50"
              >
                {submitting ? t("buttons.submitting") : t("buttons.submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
