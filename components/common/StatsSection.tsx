"use client";

import Image from "next/image";
import CountUp from "@/reactbits/TextAnimations/CountUp/CountUp";
import GradientText from "@/reactbits/TextAnimations/GradientText/GradientText";

const stats = [
  { id: 1, name: "Years of business", value: 16, suffix: "+" },
  { id: 2, name: "Business partners", value: 10000, suffix: "+" },
  { id: 3, name: "Bulk orders fulfilled", value: 200000, suffix: "+" },
  { id: 4, name: "On-time delivery rate", value: 99, suffix: "%" },
  { id: 5, name: "Available products", value: "1000", suffix: "+" },
];

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 rounded-3xl sm:py-32 mb-10">
      {/* Background image */}
      <Image
        alt="Manufacturing machinery"
        src="https://res.cloudinary.com/duimeqqch/image/upload/v1744183210/manufacturer_jgqytx.jpg"
        className="absolute inset-0 -z-10 size-full object-cover brightness-75"
        width={1000}
        height={1080}
      />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl drop-shadow-md">
            Reliable Manufacturing Proven Excellence
          </p>
          <p className="mt-6 text-lg/8 text-gray-100 drop-shadow-md">
            We are committed to providing high-quality products, reliable
            service, and seamless fulfillment. With years of expertise and a
            strong global network, we ensure efficiency, precision, and customer
            satisfaction in every order.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col gap-y-3 border-l border-white/10 pl-6 backdrop-blur-sm p-4 rounded-lg"
            >
              <dt className="text-sm/6 text-gray-100 text-center">{stat.name}</dt>
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="order-first text-3xl font-semibold tracking-tight"
              >
                <CountUp
                  from={0}
                  to={stat.value}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
                {stat.suffix}
              </GradientText>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
