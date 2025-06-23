import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { FaWhatsapp, FaWeixin} from "react-icons/fa6";
import Image from 'next/image';
import QuoteForm from '../forms/QuoteForm'
import { getLocale, getTranslations } from 'next-intl/server';
export default async function ContactSection() {
  const locale = await getLocale();
  const t = await getTranslations({locale, namespace: "ContactSection"})
  return (
      <div className="mx-auto grid container gap-12 grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6">
          <div className="mx-auto lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl">
            {t('title')}
            </h2>
            <p className="mt-6 text-lg/8 text-black">
            {t('description')}
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-black">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-black" />
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
                  <PhoneIcon aria-hidden="true" className="h-7 w-6 text-black" />
                </dt>
                <dd>
                  <a href="tel:+8619952792557" className="hover:text-black">
                    +8619952792557
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-black" />
                </dt>
                <dd>
                  <a href="mailto:info@xiangleratchetstrap.com" className="hover:text-black">
                    info@xiangleratchetstrap.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">WhatsApp QR Code</span>
                  <FaWhatsapp className="h-7 w-6 text-black" />
                </dt>
                <dd>
                <a href="https://wa.me/8619952792557" target="_blank" rel="noopener noreferrer">
                <Image src="/v1750638707/whatsAppQrCode_ixhjow.jpg" alt="WhatsApp QR Code"
                    width={200}
                    height={200} />
                </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">WeChat QR Code</span>
                  <FaWeixin className="h-7 w-6 text-black"/>
                </dt>
                <dd>
                <Image src="/v1750638707/WechatQRCode_otb3n3.jpg" alt="WeChat QR Code" 
                    width={200}
                    height={200} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className='relative px-6 m-auto'>
          <QuoteForm></QuoteForm>
        </div>
      </div>
  )
}
