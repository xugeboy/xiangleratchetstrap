'use client'

import { useState } from 'react'

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    position: '',
    message: '',
    attachment: null as File | null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 实现表单提交逻辑
    console.log('Form submitted:', formData)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        attachment: e.target.files![0]
      }))
    }
  }

  return (
    <div className="mb-16">
        <div className="lg:text-center mb-12">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
        Bulk Pricing
        Quote Request
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        Contact our experts to discuss a custom pricing program that fits your particular business needs. Just fill out the form below and we'll be in touch!
        </p>
        </div>
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto bg-white p-10 rounded-[30px] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm mb-1 text-gray-600">
            First Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
              focus:bg-white focus:border-blue-500 focus:outline-none"
            value={formData.firstName}
            onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm mb-1 text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
              focus:bg-white focus:border-blue-500 focus:outline-none"
            value={formData.lastName}
            onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm mb-1 text-gray-600">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
              focus:bg-white focus:border-blue-500 focus:outline-none"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm mb-1 text-gray-600">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
              focus:bg-white focus:border-blue-500 focus:outline-none"
            value={formData.phone}
            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
      </div>

      {/* Company Name */}
      <div className="mt-6">
        <label htmlFor="companyName" className="block text-sm mb-1 text-gray-600">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
            focus:bg-white focus:border-blue-500 focus:outline-none"
          value={formData.companyName}
          onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
        />
      </div>

      {/* Position/Title */}
      <div className="mt-6">
        <label htmlFor="position" className="block text-sm mb-1 text-gray-600">
          Position/Title
        </label>
        <input
          type="text"
          id="position"
          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
            focus:bg-white focus:border-blue-500 focus:outline-none"
          value={formData.position}
          onChange={e => setFormData(prev => ({ ...prev, position: e.target.value }))}
        />
      </div>

      {/* Message */}
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm mb-1 text-gray-600">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50
            focus:bg-white focus:border-blue-500 focus:outline-none"
          value={formData.message}
          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
        />
      </div>

      {/* Attachment */}
      <div className="mt-6">
        <label htmlFor="attachment" className="block text-sm mb-1 text-gray-600">
          Attachment
        </label>
        <div className="mt-1 bg-gray-50/50 rounded-xl border border-gray-100 p-4">
          <input
            type="file"
            id="attachment"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex items-center justify-between">
            <label
              htmlFor="attachment"
              className="cursor-pointer inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-100 
                text-sm text-gray-600 hover:border-blue-500 hover:text-blue-500
                transition-colors"
            >
              Choose File
            </label>
            <p className="text-sm text-gray-400">
              {formData.attachment ? formData.attachment.name : 'No file selected'}
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <button
          type="submit"
          className="inline-flex px-6 py-3 text-sm font-medium text-white bg-blue-500 
            rounded-xl hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
    </div>
  )
}