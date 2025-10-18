'use client';

import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { formAPI } from '@/utils/fetch-api';

interface FloatingContactProps {
  whatsappNumber?: string;
  email?: string;
}

const FloatingContact: React.FC<FloatingContactProps> = ({
  whatsappNumber = "+8619952792557", 
  email = "info@xiangleratchetstrap.com"
}) => {
  const router = useRouter();
  const t = useTranslations("QuoteForm");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    position: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello, I want to know more about your products.");
    window.open(`https://wa.me/${whatsappNumber.replace(/\s/g, '')}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleFormClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
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
    <>
      {/* 悬浮联系方式组件 - 在手机端隐藏 */}
      <div className="hidden md:flex fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex-col gap-2">
        {/* WhatsApp 按钮 */}
        <div
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 group relative"
          title="WhatsApp Contact Us"
        >
          <FaWhatsapp className="w-6 h-6" />
          {/* 悬停时显示的文字 */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            WhatsApp
          </div>
        </div>

        {/* Email 按钮 */}
        <div
          onClick={handleEmailClick}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 group relative"
          title="Send Email"
        >
          <FaEnvelope className="w-6 h-6" />
          {/* 悬停时显示的文字 */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            E-Mail
          </div>
        </div>

        {/* 询盘表单按钮 */}
        <div
          onClick={handleFormClick}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 group relative"
          title="Request Quote"
        >
          <FaFileAlt className="w-6 h-6" />
          {/* 悬停时显示的文字 */}
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Request Quote
          </div>
        </div>
      </div>

      {/* 询盘表单弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
            <div className="p-6">
              {/* 弹窗头部 */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Request Quote</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* 表单内容 */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm mb-1 text-black">
                      {t("labels.name")} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label htmlFor="position" className="block text-sm mb-1 text-black">
                      {t("labels.position")}
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm"
                      value={formData.position}
                      onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm mb-1 text-black">
                    {t("labels.companyName")}
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm"
                    value={formData.companyName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm mb-1 text-black">
                    {t("labels.message")} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white focus:border-blue-500 focus:outline-none shadow-sm"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-800 transition-colors disabled:opacity-50"
                  >
                    {submitting ? t("buttons.submitting") : t("buttons.submit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContact;
