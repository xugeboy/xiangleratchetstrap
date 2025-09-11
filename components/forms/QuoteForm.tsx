"use client";

import { useEffect, useState } from "react";
import { formAPI } from "@/utils/fetch-api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

// 1. 定义组件接收的 props 类型
interface QuoteFormProps {
  messageFromCustomizer?: string | null;
}

export default function QuoteForm({ messageFromCustomizer }: QuoteFormProps) {
  const router = useRouter();
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
    // 2. 添加 useEffect 钩子来监听 messageFromCustomizer 的变化
    useEffect(() => {
      // 当从定制页面传来消息时，更新表单的 message 状态
      if (messageFromCustomizer) {
        setFormData((prev) => ({ ...prev, message: messageFromCustomizer }));
      }
    }, [messageFromCustomizer]); // 依赖数组中包含该 prop
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
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
        router.push("/request-quote/success");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting your inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="mb-10" id="quote_form">
      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-white px-6 py-12 rounded-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm mb-1 text-black"
            >
              {t("labels.name")} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
                focus:bg-white focus:border-blue-500 focus:outline-none"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-black">
              {t("labels.email")} <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
                focus:bg-white focus:border-blue-500 focus:outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm mb-1 text-black">
              {t("labels.phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
                focus:bg-white focus:border-blue-500 focus:outline-none"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>

          {/* Position/Title */}
          <div>
            <label htmlFor="position" className="block text-sm mb-1 text-black">
              {t("labels.position")}
            </label>
            <input
              type="text"
              id="position"
              name="position"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
              focus:bg-white focus:border-blue-500 focus:outline-none"
              value={formData.position}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, position: e.target.value }))
              }
            />
          </div>

          {/* Company Name */}
          <div className="col-span-2">
            <label
              htmlFor="companyName"
              className="block text-sm mb-1 text-black"
            >
              {t("labels.companyName")}
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
              focus:bg-white focus:border-blue-500 focus:outline-none"
              value={formData.companyName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
              }
            />
          </div>

        </div>

        {/* Message */}
        <div className="mt-6">
          <label htmlFor="message" className="block text-sm mb-1 text-black">
            {t("labels.message")} <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={10}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
              focus:bg-white focus:border-blue-500 focus:outline-none"
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
          />
        </div>


        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex px-6 py-3 text-sm font-medium text-white bg-red-600 
              rounded-xl hover:bg-red-800 transition-colors disabled:opacity-50"
          >
            {submitting ? t("buttons.submitting") : t("buttons.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
