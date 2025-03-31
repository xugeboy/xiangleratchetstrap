import Link from "next/link"

export function TopNavigation() {
  return (
    <div className="hidden md:block bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 items-center justify-end space-x-8">
          <Link href="/business-solutions" className="text-sm font-medium hover:text-gray-300">
            Business Solutions
          </Link>
          <Link href="/contact-us" className="text-sm font-medium hover:text-gray-300">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

