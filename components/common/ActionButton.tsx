"use client"

import Link from "next/link"
import type { IconType } from "react-icons"

export interface ActionButtonProps {
  href: string
  text: string
  icon: IconType
  variant?: "primary" | "secondary"
  onClick?: () => void
}

export function ActionButton({ href, text, icon: Icon, variant = "primary", onClick }: ActionButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-8 py-4 font-bold transition-all duration-300 text-sm uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"

  const styles = {
    primary: "text-white bg-red-600",
    secondary: "text-white bg-black",
  }

  return (
    <Link href={href} onClick={onClick} className={`${baseClasses} ${styles[variant]} gap-3`}>
      <Icon size={18} />
      <span>{text}</span>
    </Link>
  )
}
