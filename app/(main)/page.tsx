import Hero from "@/components/Hero"
import About from "@/components/About"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import Education from "@/components/Education"
import Contact from "@/components/Contact"
import Link from "next/link"

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
            
            {/* Christmas Floating Button */}
            <Link href="/christmas">
                <button className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-red-500 to-green-600 hover:from-red-600 hover:to-green-700 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center text-3xl animate-bounce z-50 group">
                    🎄
                    <span className="absolute -top-12 right-0 bg-black/80 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Merry Christmas! 🎅
                    </span>
                </button>
            </Link>
        </div>
    )
}