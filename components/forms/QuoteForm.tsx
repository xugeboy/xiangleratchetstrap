"use client";

import { useState } from "react";
import { formAPI } from "@/utils/fetch-api";
import Notification from "../common/Notification";
import { useTranslations } from "next-intl";

export default function QuoteForm() {
  const t = useTranslations("QuoteForm");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    position: "",
    message: "",
    attachment: [] as File[],
  });
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.firstName + " " + formData.lastName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("company", formData.companyName);
    data.append("position", formData.position);
    data.append("message", formData.message);

    formData.attachment.forEach((file) => {
      data.append("files.attachment", file);
    });

    const resData = await formAPI("/submitInquiry", data);

    setSuccessMessage(resData.message);
    setShowSuccessNotification(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) {
      alert("You can upload up to 3 files only.");
      return;
    }
    setFormData((prev) => ({ ...prev, attachment: files }));
  };

  return (
    <div className="mb-10" id="quote_form">
      <Notification
        message={successMessage} // successMessage 现在可能来自 t() 或 API
        trigger={showSuccessNotification}
      />
      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-white px-6 py-12 rounded-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm mb-1 text-black"
            >
              {t("labels.firstName")} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
                focus:bg-white focus:border-blue-500 focus:outline-none"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm mb-1 text-black">
              {t("labels.lastName")}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
                focus:bg-white focus:border-blue-500 focus:outline-none"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
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
          
          {/* Email */}
          <div className="col-span-2 md:col-span-1">
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

          {/* Company Name */}
          <div className="col-span-2 md:col-span-1">
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
            rows={4}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
              focus:bg-white focus:border-blue-500 focus:outline-none"
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
          />
        </div>

        {/* Attachment */}
        <div className="mt-6">
          <label htmlFor="attachment" className="block text-sm mb-1 text-black">
            {t("labels.attachment")}
          </label>
          <div className="mt-1 bg-gray-50/50 rounded-xl border border-gray-100 p-4">
            <input
              type="file"
              id="attachment"
              name="attachment_files" // 确保 name 属性对 FormData 有意义
              className="hidden"
              multiple
              onChange={handleFileChange}
              accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt" // 示例：限制文件类型
            />
            <div className="flex items-center justify-between">
              <label
                htmlFor="attachment"
                className="cursor-pointer inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-100 
                  text-sm text-black hover:border-blue-500 hover:text-blue-500
                  transition-colors"
              >
                {t("buttons.chooseFile")}
              </label>
              <p className="text-sm text-black">
                {formData.attachment.length > 0
                  ? formData.attachment.map((f) => f.name).join(", ")
                  : t("fileUpload.noFileSelected")}
              </p>
            </div>
            <p className="text-xs text-black mt-1">
              {t("fileUpload.maxFilesHint", { count: 3 })}
            </p>{" "}
            {/* 添加提示 */}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            // disabled={isLoading} // 禁用按钮当正在加载时
            className="inline-flex px-6 py-3 text-sm font-medium text-white bg-amber-700 
              rounded-xl hover:bg-amber-800 transition-colors disabled:opacity-50"
          >
            {/* {isLoading ? t("buttons.submitting") : t("buttons.submit")} */}
            {t("buttons.submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
