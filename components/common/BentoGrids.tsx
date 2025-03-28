export default function BentoGrids() {
    return (
        <div className="mx-auto max-w-2xl py-12 px-6 lg:max-w-7xl lg:px-8">
          <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl">
          Tailored Bulk Pricing Solutions
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <div className="relative lg:col-span-3">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                {/* <CloudinaryImage publicId="bento-01-performance" alt="Performance" className="h-80 object-cover object-left"></CloudinaryImage> */}
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">Manufacturing</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Factory-Direct Production
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  As a manufacturer, we oversee the entire production process, ensuring strict quality control and cost efficiency. Our advanced facility in China produces high-quality tie-down straps, cargo nets, and lifting slings tailored to your needs.                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            </div>
            <div className="relative lg:col-span-3">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              {/* <CloudinaryImage publicId="bento-01-performance" alt="Performance" className="h-80 object-cover object-left lg:object-right"></CloudinaryImage> */}
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">Speed</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Fast & Reliable Delivery
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  With an optimized production line and a robust logistics network, we ensure quick order fulfillment. Bulk orders are processed efficiently, and we offer flexible shipping solutions to meet global demand.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-tr-[2rem]" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              {/* <CloudinaryImage publicId="bento-01-performance" alt="Performance" className="h-80 object-cover object-left"></CloudinaryImage> */}
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">Customization </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Tailored to Your Needs
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Every business is unique, and so are its requirements. We offer fully customizable products, including size, material, and branding options, to match your exact specifications.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-bl-[2rem]" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              {/* <CloudinaryImage publicId="bento-01-performance" alt="Performance" className="h-80 object-cover"></CloudinaryImage> */}
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">Expertise </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Industry-Leading Team</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Our experienced professionals are dedicated to providing top-notch solutions. From product recommendations to technical support, we ensure you get the best products for your business.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              {/* <CloudinaryImage publicId="bento-01-performance" alt="Performance" className="h-80 object-cover"></CloudinaryImage> */}
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-indigo-600">Partnership </h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Long-Term Business Support</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  We are more than just a supplier—we are your manufacturing partner. With competitive pricing, bulk order flexibility, and expert guidance, we help you scale your business efficiently.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            </div>
          </div>
        </div>
    )
  }
  