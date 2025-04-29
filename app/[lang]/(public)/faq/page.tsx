import { Metadata } from 'next'
import FaqList from './FaqList'
import { getFaqs } from '@/services/api/faq'

export const metadata: Metadata = {
  title: 'FAQ - Xiangle Ratchet Strap',
  description: '关于我们产品和服务的常见问题解答',
}

export default async function FaqPage() {
  const faqs = await getFaqs()

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
          There&apos;s a lot to know about webbing and straps! Here&apos;s some of the most common questions:
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl">
          <FaqList faqs={faqs} />
        </div>
        <div className="mx-auto max-w-4xl mt-16 text-center">
          <p className="mt-4 text-lg leading-8 text-gray-600">
          Didn&apos;t find the answer you&apos;re looking for? We&apos;d be glad to clear things up! Check out our <u><a href="/contact-us">Contact Us Page</a></u> Page to send us a message. Thank you!
          </p>
        </div>
      </div>
    </div>
  )
} 