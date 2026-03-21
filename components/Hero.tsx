"use client"

import { cvData } from "@/cvData"
import { Github, Mail, Phone, ChevronDown, Terminal } from "lucide-react"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef, useCallback } from "react"

const roles = [
  "Front-End Developer",
  "UI/UX Enthusiast",
  "React Specialist",
  "TypeScript Lover",
]

// Particle system for canvas background
function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string
    }> = []

    const colors = ["#00F5FF", "#BF5AF2", "#FF2D55", "#30D158"]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 15000)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x
          const dy = p.y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = p.color
            ctx.globalAlpha = (1 - dist / 120) * 0.15
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(drawParticles)
    }

    resize()
    createParticles()
    drawParticles()

    window.addEventListener("resize", () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [canvasRef])
}

// Typing effect hook
function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1))
        if (text.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        setText(currentWord.slice(0, text.length - 1))
        if (text.length === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [text, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration])

  return text
}

export default function Hero() {
  const { personalInfo } = cvData
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const typedText = useTypingEffect(roles)

  useParticles(canvasRef)

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background z-[1]" />
      <div className="absolute inset-0 bg-grid-pattern z-[1]" />

      {/* Radial glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl z-[1]" />

      {/* Floating code decoration */}
      <motion.div
        className="absolute top-20 right-10 md:right-20 hidden md:block z-[2] opacity-20"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <pre className="text-xs font-mono text-neon-cyan">
          {`const dev = {
  name: "${personalInfo.name}",
  passion: "building UIs",
  coffee: Infinity
};`}
        </pre>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-10 md:left-20 hidden md:block z-[2] opacity-20"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <pre className="text-xs font-mono text-neon-purple">
          {`<Component
  style="premium"
  animated={true}
/>`}
        </pre>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green" />
            </span>
            <span className="text-muted-foreground">Available for opportunities</span>
          </div>
        </motion.div>

        {/* Name with shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="text-gradient-cyan animate-shimmer bg-[linear-gradient(110deg,#00F5FF,45%,#E8ECF4,55%,#BF5AF2)] bg-[length:200%_100%] bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </h1>
        </motion.div>

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-2"
        >
          <Terminal className="w-5 h-5 text-neon-cyan" />
          <div className="text-xl md:text-2xl font-mono">
            <span className="text-muted-foreground">{">"} </span>
            <span className="text-foreground">{typedText}</span>
            <span className="inline-block w-0.5 h-6 bg-neon-cyan ml-1 animate-blink align-middle" />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4 justify-center items-center flex-wrap pt-4"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-neon-cyan to-neon-purple text-background font-semibold hover:opacity-90 transition-opacity glow-cyan"
            asChild
          >
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all"
            asChild
          >
            <a href={`mailto:${personalInfo.email}`}>
              <Mail className="w-5 h-5 mr-2 text-neon-cyan" />
              Email
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-neon-purple/30 hover:border-neon-purple hover:bg-neon-purple/10 transition-all"
            asChild
          >
            <a href={`tel:${personalInfo.phone}`}>
              <Phone className="w-5 h-5 mr-2 text-neon-purple" />
              Call
            </a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-16"
        >
          <button
            onClick={scrollToContent}
            className="cursor-pointer group flex flex-col items-center gap-2 text-muted-foreground hover:text-neon-cyan transition-colors"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
