"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"

export default function ScrollProgressCircle() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? (latest / docHeight) * 100 : 0
    setScrollProgress(progress)
    setVisible(latest > 50)
  })

  const radius = 18
  const stroke = 3
  const normalizedRadius = radius - stroke / 2
  const circumference = 2 * Math.PI * normalizedRadius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 right-5 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <svg width={radius * 2} height={radius * 2} className="drop-shadow-lg">
            {/* Background circle */}
            <circle
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              fill="rgba(0, 0, 0, 0.4)"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={stroke}
            />
            {/* Progress circle */}
            <circle
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${radius} ${radius})`}
              style={{ transition: "stroke-dashoffset 0.1s ease" }}
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--neon-cyan, #00F5FF)" />
                <stop offset="100%" stopColor="var(--neon-purple, #BF5AF2)" />
              </linearGradient>
            </defs>
          </svg>
          {/* Percentage text */}
          <span
            className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white/80"
            style={{ letterSpacing: "-0.5px" }}
          >
            {Math.round(scrollProgress)}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
