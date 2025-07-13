import Link from "next/link"
import { HiArrowRight } from "react-icons/hi2"

export interface ServiceCardProps {
  title: string
  linkText: string
  href: string
}

export function ServiceCard({ title, linkText, href }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg mb-3 transition-colors duration-300">
              {title}
            </h3>

            <Link
              href={href}
              className="text-red-600 font-semibold inline-flex items-center gap-2 group/link"
            >
              {linkText}
              <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
