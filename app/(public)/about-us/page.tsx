import Image from "next/image";
import LogoClouds from "@/components/common/LogoClouds";

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
                At Xiangle Ratchet Strap, our mission and vision are
                intertwined: to empower small and medium-sized enterprises
                (SMBs) worldwide by providing dependable, high-performance, and
                safe tie-down solutions that ensure efficiency and peace of
                mind. We are committed to offering high-quality, competitively
                priced, and highly customized one-stop cargo control solutions, fostering a
                strong partnership that enables us to grow together with our
                customers and contribute to their success in confidently
                securing their shipments, structures, and projects.
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
      <div className="mx-auto -mt-8 max-w-7xl px-6 lg:px-8 mb-40">
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
      <LogoClouds />

      {/* Content section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
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
              alt="custom_product__capabilities"
              src="https://res.cloudinary.com/duimeqqch/image/upload/v1744613195/custom_product__capabilities_np35yw.jpg"
              width={576}
              height={576}
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

      {/* Content section - Global Reach */}
      <div className="mt-32 overflow-hidden sm:mt-40">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
            {/* 文字区域 - 放右边 */}
            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Global Reach
              </h2>
              <p className="mt-6 text-xl/8 text-gray-600">
                Since entering the international market in 2016, Xiangle&apos;s
                products have been shipped to customers across North America,
                Europe, Southeast Asia, and Australia. Backed by a robust
                inventory system and responsive logistics team, we ensure timely
                delivery and reliable supply for partners worldwide—whether
                you&apos;re a distributor, e-commerce brand, or industrial end
                user.
              </p>
            </div>
            {/* 图片区域 - 放左边 */}
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <Image
                alt=""
                src="https://res.cloudinary.com/duimeqqch/image/upload/v1744277874/global_reach_iic60m.png"
                className="max-w-none rounded-2xl bg-gray-50"
                width={718}
                height={387}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
