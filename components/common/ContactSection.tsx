import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import QuoteForm from '../forms/QuoteForm'

export default function ContactSection() {
  return (
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
              </svg>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            We Work For you
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
            We take customer service very seriously and pride ourselves on having the best customer service in the industry.
            Our team will work tirelessly to ensure you are getting the high-quality products you need, and the exceptional service you deserve. You will always speak with a real, live person and will never have to wait for more than 1 business day to hear back. We&apos;ve got your back!
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  No. 18 Zhenxing Road, Yangshe Town
                  <br />
                  Zhangjiagang City, Suzhou, China, 215600
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <a href="tel:+8618921978916" className="hover:text-gray-900">
                    +8618921978916
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <a href="mailto:info@xiangleratchetstrap.com" className="hover:text-gray-900">
                    info@xiangleratchetstrap.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <QuoteForm></QuoteForm>
      </div>
  )
}
