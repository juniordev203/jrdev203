import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Skills from "@/components/Skills"
import Education from "@/components/Education"
import Contact from "@/components/Contact"
import ReactionBar from "@/components/ReactionBar"
import CursorGlow from "@/components/CursorGlow"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background relative">
            {/* Global background effects */}
            <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -right-32 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-neon-pink/3 rounded-full blur-3xl" />
            </div>

            {/* Cursor glow effect */}
            <CursorGlow />

            <div className="relative z-10">
                <Hero />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-20">
                    {/* Section divider */}
                    <div className="section-divider" />
                    <About />
                    <div className="section-divider" />
                    <Experience />
                    <div className="section-divider" />
                    <Skills />
                    <div className="section-divider" />
                    <Education />
                    <div className="section-divider" />
                    <Contact />
                </div>

                {/* Footer */}
                <footer className="relative py-8 text-center border-t border-white/5">
                    <p className="text-sm text-muted-foreground font-mono">
                        Designed & Built by{" "}
                        <span className="text-gradient-cyan font-semibold">@jrdev203</span>
                    </p>
                    <p className="text-xs text-muted-foreground/50 mt-1 font-mono">
                        © {new Date().getFullYear()} — Crafted with 💜 and lots of ☕
                    </p>
                </footer>
            </div>

            {/* Floating reaction bar */}
            {/* <ReactionBar /> */}
        </div>
    )
}