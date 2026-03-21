"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"

type ReactionType = "happy" | "love" | "sad"

interface ReactionCounts {
  happy: number
  love: number
  sad: number
}

const reactions: { type: ReactionType; emoji: string; label: string; color: string }[] = [
  { type: "happy", emoji: "😄", label: "Happy", color: "#FFD60A" },
  { type: "love", emoji: "❤️", label: "Love", color: "#FF2D55" },
  { type: "sad", emoji: "😢", label: "Sad", color: "#00F5FF" },
]

// Burst particle component
function BurstParticle({ emoji, index, onComplete }: { emoji: string; index: number; onComplete: () => void }) {
  const angle = (index * 360) / 8 + Math.random() * 30
  const distance = 60 + Math.random() * 40
  const rad = (angle * Math.PI) / 180

  return (
    <motion.span
      className="absolute text-lg pointer-events-none select-none"
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(rad) * distance,
        y: Math.sin(rad) * distance - 30,
        opacity: 0,
        scale: 0.3,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      onAnimationComplete={onComplete}
    >
      {emoji}
    </motion.span>
  )
}

export default function ReactionBar() {
  const [counts, setCounts] = useState<ReactionCounts>({ happy: 0, love: 0, sad: 0 })
  const [voted, setVoted] = useState<Set<ReactionType>>(new Set())
  const [bursts, setBursts] = useState<{ id: number; type: ReactionType }[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [burstCounter, setBurstCounter] = useState(0)

  // Fetch counts on mount
  useEffect(() => {
    fetch("/api/reactions")
      .then((res) => res.json())
      .then((data) => {
        if (data.happy !== undefined) {
          setCounts(data)
        }
      })
      .catch(() => { })

    // Load voted state from localStorage
    const savedVoted = localStorage.getItem("reactions_voted")
    if (savedVoted) {
      setVoted(new Set(JSON.parse(savedVoted)))
    }
  }, [])

  // Show bar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleReaction = useCallback(async (type: ReactionType) => {
    if (voted.has(type)) return

    // Optimistic update
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }))

    // Mark as voted
    const newVoted = new Set(voted)
    newVoted.add(type)
    setVoted(newVoted)
    localStorage.setItem("reactions_voted", JSON.stringify([...newVoted]))

    // Trigger burst
    const newId = burstCounter
    setBurstCounter((c) => c + 1)
    setBursts((prev) => [...prev, { id: newId, type }])

    // API call
    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      })
      const data = await res.json()
      if (data.happy !== undefined) {
        setCounts(data)
      }
    } catch {
      // Revert on error
      setCounts((prev) => ({ ...prev, [type]: prev[type] - 1 }))
      const revertVoted = new Set(voted)
      revertVoted.delete(type)
      setVoted(revertVoted)
      localStorage.setItem("reactions_voted", JSON.stringify([...revertVoted]))
    }
  }, [voted, burstCounter])

  const removeBurst = useCallback((id: number) => {
    setBursts((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
    return count.toString()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="glass rounded-2xl px-6 py-3 flex items-center gap-6 shadow-lg shadow-black/20">

            {/* Reaction buttons */}
            <div className="flex items-center gap-4">
              {reactions.map((reaction) => {
                const isVoted = voted.has(reaction.type)
                const count = counts[reaction.type]

                return (
                  <div key={reaction.type} className="relative flex flex-col items-center gap-1">
                    {/* Burst particles */}
                    <AnimatePresence>
                      {bursts
                        .filter((b) => b.type === reaction.type)
                        .map((burst) => (
                          <div key={burst.id} className="absolute inset-0 flex items-center justify-center">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <BurstParticle
                                key={i}
                                emoji={reaction.emoji}
                                index={i}
                                onComplete={() => removeBurst(burst.id)}
                              />
                            ))}
                          </div>
                        ))}
                    </AnimatePresence>

                    {/* Button */}
                    <motion.button
                      onClick={() => handleReaction(reaction.type)}
                      disabled={isVoted}
                      whileHover={!isVoted ? { scale: 1.3 } : {}}
                      whileTap={!isVoted ? { scale: 0.85 } : {}}
                      className={`relative text-2xl transition-all duration-200 ${isVoted ? "cursor-default" : "cursor-pointer hover:drop-shadow-lg"
                        }`}
                      style={isVoted ? { filter: `drop-shadow(0 0 8px ${reaction.color})` } : {}}
                    >
                      <span className="block">{reaction.emoji}</span>

                      {/* Glow ring for voted */}
                      {isVoted && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute -inset-1 pointer-events-none"
                        />
                      )}
                    </motion.button>

                    {/* Count */}
                    <motion.span
                      key={count}
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-xs font-mono text-muted-foreground tabular-nums"
                    >
                      {formatCount(count)}
                    </motion.span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
