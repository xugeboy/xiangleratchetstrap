"use client";
import { useState } from "react";
import { postAPI } from "@/utils/fetch-api";
import Notification from "../common/Notification";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 防止重复提交
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      // 发送请求到 Strapi 后端
      const response = await postAPI("/submitSubscribe", {
        "email": email
      });

      if (response.message) {
        setSuccessMessage("Subscription successful! Thank you.");
        setShowSuccessNotification(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      <Notification
        message={successMessage}
        trigger={showSuccessNotification}
      />
      <h3 className="text-base font-semibold text-amber-700">
        Stay Updated! 
      </h3>
      <span className="text-sm/6 text-gray-400">
        Be the first to know about the latest products, offers and stories.
      </span>
      <form onSubmit={handleSubmit} className="mt-6 sm:flex sm:max-w-md">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="email-address"
          name="email-address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          className="w-full min-w-0 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-800 sm:w-64 sm:text-sm/6 xl:w-full"
        />
        <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-md bg-amber-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
}
