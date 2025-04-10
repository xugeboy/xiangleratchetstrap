import Image from "next/image";
import ClientsWorldMap from "@/components/common/ClientsWorldMap";

const timeline = [
  {
    name: "Factory Established",
    description:
      "Our journey began in 2006 with the founding of our manufacturing facility, laying the foundation for years of growth and innovation in tie-down strap production.",
    date: "2006",
    dateTime: "2006-01",
  },
  {
    name: "Entered International Trade",
    description:
      "In 2016, we expanded into global markets, launching our export business and building long-term partnerships with clients around the world.",
    date: "2016",
    dateTime: "2016-01",
  },
  {
    name: "Scaled to 100 Workers, $5M Output",
    description:
      "By 2023, our workforce reached 100 employees and our annual production value surpassed $5 million, marking a major milestone in our capacity and capabilities.",
    date: "2023",
    dateTime: "2023-01",
  },
  {
    name: "New Product Innovation",
    description:
      "In 2024, we launched our newly developed automatic retractable ratchet strap and increased our annual production value to $7 million.",
    date: "2024",
    dateTime: "2024-01",
  },
];

export default function Example() {
  return (
    <div>
      <div className="relative isolate -z-10 overflow-hidden bg-linear-to-b from-indigo-100/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-indigo-600/10 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            {/* <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We’re changing the way people connect</h1> */}
            <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
              Our Mission & Vision
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                At Xiangle Ratchet Strap, our mission is simple: to provide
                dependable, high-performance tie-down solutions that ensure
                safety, efficiency, and peace of mind. We envision a world where
                every shipment, structure, and project is secured with
                confidence—powered by the strength of our straps.
              </p>
            </div>
            <Image
              alt=""
              src="https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg"
              className="mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />
      </div>

      {/* Timeline section */}
      <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {timeline.map((item) => (
            <div key={item.name}>
              <time
                dateTime={item.dateTime}
                className="flex items-center text-sm/6 font-semibold text-indigo-600"
              >
                <svg
                  viewBox="0 0 4 4"
                  aria-hidden="true"
                  className="mr-4 size-1 flex-none"
                >
                  <circle r={2} cx={2} cy={2} fill="currentColor" />
                </svg>
                {item.date}
                <div
                  aria-hidden="true"
                  className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                />
              </time>
              <p className="mt-6 text-lg/8 font-semibold tracking-tight text-gray-900">
                {item.name}
              </p>
              <p className="mt-1 text-base/7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Logo cloud */}
      <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our customers love us
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-gray-300">
            Aliquip reprehenderit incididunt amet quis fugiat ut velit. Sit
            occaecat labore proident cillum in nisi adipisicing officia
            excepteur tempor deserunt.
          </p>
          <div className="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5">
            <Image
              alt="Transistor"
              src="/plus-assets/img/logos/158x48/transistor-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <Image
              alt="Reform"
              src="/plus-assets/img/logos/158x48/reform-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <Image
              alt="Tuple"
              src="/plus-assets/img/logos/158x48/tuple-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            />
            <Image
              alt="SavvyCal"
              src="/plus-assets/img/logos/158x48/savvycal-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            />
            <Image
              alt="Statamic"
              src="/plus-assets/img/logos/158x48/statamic-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
              className="aspect-1404/767 w-[87.75rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            />
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="mt-32 overflow-hidden sm:mt-40">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Our Strength
              </h2>
              <p className="mt-6 text-xl/8 text-gray-600">
                Xiangle Ratchet Strap operates with a strong manufacturing
                backbone, powered by a skilled workforce, automated production
                lines, and a commitment to continuous improvement. Our factory
                integrates advanced equipment, rigorous quality control systems,
                and a scalable production capacity to meet both high-volume
                orders and custom requirements. Whether it’s precision-welded
                buckles or next-generation retractable systems, we focus on
                delivering consistent performance with every strap produced.
              </p>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <Image
                  alt=""
                  src="https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg"
                  className="aspect-7/5 w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  width={300}
                  height={300}
                />
              </div>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <Image
                    alt=""
                    src="https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg"
                    className="aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <Image
                    alt=""
                    src="https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg"
                    className="aspect-7/5 w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <Image
                    alt=""
                    src="https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg"
                    className="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Global Reach
          </h2>
          <p className="mt-6 text-base/7 text-gray-600">
            Since entering the international market in 2016, Xiangle’s products
            have been shipped to customers across North America, Europe,
            Southeast Asia, and Australia. Backed by a robust inventory system
            and responsive logistics team, we ensure timely delivery and
            reliable supply for partners worldwide—whether you&apos;re a
            distributor, e-commerce brand, or industrial end user.
          </p>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
          <ClientsWorldMap />
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
              Engineering & OEM Capabilities
            </h2>
            <p className="mt-6 text-xl/8 text-gray-600">
              Innovation lies at the core of what we do. From custom length
              straps to fully branded solutions, Xiangle provides full OEM/ODM
              services tailored to your market needs. Our in-house development
              team is continuously exploring new materials, user-friendly
              designs, and cost-effective improvements—bringing your product
              ideas to life, with factory-level control and quality assurance.
            </p>
          </div>
          <div className="w-full lg:max-w-xl lg:flex-auto">
            <Image
              alt=""
              src="https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg"
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
