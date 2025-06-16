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
    <nav aria-label="Breadcrumb" className="py-4 hidden md:flex">
      <ol role="list" className="flex items-center space-x-4">
        {showHome && (
          <li>
            <div>
              <Link href={pathPrefix} className="text-black hover:text-black">
                <HomeIcon className="size-5 shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
        )}
        {items.map((item, index) => (
          <li key={item.href}>
            <div className="flex items-center">
              <ChevronRightIcon className="size-5 shrink-0 text-black" aria-hidden="true" />
              <Link
                href={item.href}
                className={`ml-4 text-sm font-medium ${
                  index === items.length - 1
                    ? 'text-black cursor-default'
                    : 'text-black hover:text-black'
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