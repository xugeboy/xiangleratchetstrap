import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { BreadcrumbItem } from '@/types/breadcrumbItem'
import { getCombainedLocalePath } from '@/utils/formatUtils'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showHome?: boolean
  lang: string
}
export default function Breadcrumb({ lang, items, showHome = true }: BreadcrumbProps) {
  const pathPrefix = getCombainedLocalePath(lang, "")
  return (
    <nav aria-label="Breadcrumb" className="flex py-4">
      <ol role="list" className="flex items-center space-x-4">
        {showHome && (
          <li>
            <div>
              <Link href={pathPrefix} className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="size-5 shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
        )}
        {items.map((item, index) => (
          <li key={item.href}>
            <div className="flex items-center">
              <ChevronRightIcon className="size-5 shrink-0 text-gray-400" aria-hidden="true" />
              <Link
                href={item.href}
                className={`ml-4 text-sm font-medium ${
                  index === items.length - 1
                    ? 'text-gray-500 cursor-default'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}