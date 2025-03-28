import Image from 'next/image';

const stats = [
    { id: 1, name: 'Years of business', value: '16+' },
    { id: 2, name: 'Business partners', value: '10,000+' },
    { id: 3, name: 'Bulk orders fulfilled', value: '200,000+' },
    { id: 4, name: 'On-time delivery rate', value: '99%' },
    { id: 5, name: 'Available products', value: '1,000+' },
  ]
  
  export default function Example() {
    return (
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <Image
          alt=""
          src="/image/banner.png"
          className="absolute inset-0 -z-10 size-full object-cover"
          width={1000}
          height={1080}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                Reliable Manufacturing Proven Excellence
            </p>
            <p className="mt-6 text-lg/8 text-gray-300">
            We are committed to providing high-quality products, reliable service, and seamless fulfillment. With years of expertise and a strong global network, we ensure efficiency, precision, and customer satisfaction in every order.
            </p>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
                <dt className="text-sm/6">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }
  