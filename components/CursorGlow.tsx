"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export default function CursorGlow() {
  const [isDesktop, setIsDesktop] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 300, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 20 })

  useEffect(() => {
    // Only show on non-touch devices
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setIsDesktop(!hasTouch)

    if (hasTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorX, cursorY])

  if (!isDesktop) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-40 mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Main glow */}
      <div className="w-80 h-80 rounded-full bg-gradient-radial opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.15) 0%, rgba(191,90,242,0.08) 40%, transparent 70%)",
        }}
      />
      {/* Inner bright spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  )
}
