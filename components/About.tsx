"use client"

import { cvData } from "@/cvData"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { Sparkles, Code2, Rocket, Coffee } from "lucide-react"
import { useEffect, useState, useRef } from "react"

// Animated counter hook
function useAnimatedCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    let start = 0
    const step = target / (duration / 16)

    const interval = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(interval)
  }, [started, target, duration])

  return { count, ref }
}

const stats = [
  { label: "Years Experience", value: 1.5, suffix: "+", icon: Rocket },
  { label: "Projects Built", value: 5, suffix: "+", icon: Code2 },
  { label: "Tech Stacks", value: 8, suffix: "+", icon: Sparkles },
  { label: "Cups of Coffee", value: 999, suffix: "+", icon: Coffee },
]

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="about"
      className="scroll-mt-20"
    >
      {/* Section header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-neon-cyan/30" />
        <h2 className="text-3xl md:text-4xl font-bold text-gradient-cyan">
          About Me
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-neon-purple/30" />
      </div>

      {/* Bento layout */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Profile card - left */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="gradient-border h-full">
            <div className="p-8 flex flex-col items-center justify-center h-full space-y-6 bg-card rounded-lg">
              {/* Animated avatar ring */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-pink p-[3px] animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <span className="text-4xl font-bold text-gradient-cyan">PH</span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-neon-green w-5 h-5 rounded-full border-4 border-card" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold">{cvData.personalInfo.name}</h3>
                <p className="text-sm text-neon-cyan font-mono">Front-End Developer</p>
                <p className="text-xs text-muted-foreground font-mono">📍 Hanoi, Vietnam</p>
              </div>

              {/* Decorative terminal */}
              <div className="w-full rounded-lg bg-background/50 p-3 font-mono text-xs">
                <div className="flex gap-1.5 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neon-pink/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFD60A]/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neon-green/60" />
                </div>
                <p className="text-muted-foreground">
                  <span className="text-neon-cyan">~</span> npm run build:career
                </p>
                <p className="text-neon-green mt-1">✓ Building amazing UIs...</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio content - right */}
        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="gradient-border h-full">
            <div className="p-8 space-y-5 bg-card rounded-lg h-full">
              {cvData.introduction.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-muted-foreground leading-relaxed text-[15px]"
                >
                  {paragraph}
                </motion.p>
              ))}

              {/* Highlight keywords */}
              <div className="pt-4 flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Vue 3", "TailwindCSS", "Framer Motion"].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    viewport={{ once: true }}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 hover:bg-neon-cyan/20 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {stats.map((stat, index) => {
          const { count, ref } = useAnimatedCounter(stat.value === 1.5 ? 15 : stat.value)
          const Icon = stat.icon

          return (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="gradient-border group"
            >
              <div className="p-6 text-center bg-card rounded-lg">
                <Icon className="w-6 h-6 mx-auto mb-3 text-neon-cyan group-hover:text-neon-purple transition-colors" />
                <p className="text-2xl md:text-3xl font-bold text-gradient-cyan">
                  {stat.value === 1.5 ? (count / 10).toFixed(1) : count}
                  <span className="text-neon-purple">{stat.suffix}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
