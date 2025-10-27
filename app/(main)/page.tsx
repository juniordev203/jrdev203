import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import Education from "@/components/Education"
import Contact from "@/components/Contact"

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pb-20">
                <About />
                <Experience />
                <Projects />
                <Skills />
                <Education />
                <Contact />
            </div>
            <p className="text-center pb-2 text-gray-500 text-xs">Design by @juniordev</p>
        </div>
    )
}