"use client";

import { useState } from "react";
import { formAPI } from "@/utils/fetch-api";
import { useTranslations } from "next-intl";

export default function BlogQuickInquiryForm() {
  const t = useTranslations("BlogQuickInquiry");
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.firstName);
      data.append("email", formData.email);
      data.append("message", formData.message);

      await formAPI("/submitInquiry", data);
      setSubmitted(true);
      setFormData({ firstName: "", email: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl bg-white p-4 shadow text-sm text-black">
        <p>{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className=" bg-white p-4 text-black">
      <h3 className="text-base font-semibold mb-3">{t("title")}</h3>
      <div className="mb-3">
        <label htmlFor="firstName" className="block text-xs mb-1">{t("labels.firstName")} *</label>
        <input
          id="firstName"
          type="text"
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none text-sm"
          value={formData.firstName}
          onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="block text-xs mb-1">{t("labels.email")} *</label>
        <input
          id="email"
          type="email"
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none text-sm"
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-xs mb-1">{t("labels.message")} *</label>
        <textarea
          id="message"
          required
          rows={6}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none text-sm"
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-60"
      >
        {submitting ? t("buttons.submitting") : t("buttons.submit")}
      </button>
    </form>
  );
}


