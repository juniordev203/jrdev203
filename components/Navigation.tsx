"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

const navItems = [
  { href: "/", label: "Index", icon: Home },
  { href: "/blog", label: "Blog", icon: FileText },
]

export default function Navigation() {
  const pathname = usePathname()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const activeIndex = navItems.findIndex(item => {
    if (item.href === "/") return pathname === "/"
    return pathname.startsWith(item.href)
  })

  useEffect(() => {
    if (activeIndex !== -1 && navRefs.current[activeIndex] && containerRef.current) {
      const activeElement = navRefs.current[activeIndex]
      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const activeRect = activeElement.getBoundingClientRect()

      setIndicatorStyle({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      })
    }
  }, [activeIndex, pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          <div ref={containerRef} className="relative flex items-center gap-1 bg-muted/50 rounded-full p-1">
            {activeIndex !== -1 && indicatorStyle.width > 0 && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bg-primary rounded-full"
                initial={false}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                style={{ height: "calc(100% - 8px)", top: 4 }}
              />
            )}

            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = index === activeIndex

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el) => { navRefs.current[index] = el }}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors z-10",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
