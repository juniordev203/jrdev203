"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

const navItems = [
  { href: "/", label: "Index", icon: Home },
]

export default function Navigation() {
  const pathname = usePathname()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const { scrollY } = useScroll()

  const activeIndex = navItems.findIndex(item => {
    if (item.href === "/") return pathname === "/"
    return pathname.startsWith(item.href)
  })

  // Hide/show on scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }

    // Scroll progress
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    setScrollProgress(docHeight > 0 ? (latest / docHeight) * 100 : 0)
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
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            {/* <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center font-bold text-sm text-background overflow-hidden">
                PH
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gradient-cyan">
                jrdev203
              </span>
            </Link> */}

            {/* Nav items */}
            <div ref={containerRef} className="relative flex items-center gap-1 bg-white/5 rounded-full p-1">
              {activeIndex !== -1 && indicatorStyle.width > 0 && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
                  initial={false}
                  animate={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  style={{ height: "calc(100% - 8px)", top: 4 }}
                />
              )}

              {/* {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = index === activeIndex

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={(el) => { navRefs.current[index] = el }}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors z-10",
                      isActive ? "text-background font-semibold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })} */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div className="h-[2px] bg-transparent relative">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.nav>
  )
}
