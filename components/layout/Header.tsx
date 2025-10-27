"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    { name: "Index", href: "/" },
    { name: "Blog", href: "/blog" },
]

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full shadow bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex mx-auto h-16 items-center justify-center">

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Mở menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <div className="flex flex-col space-y-4 mt-8">
                            {/* Mobile Navigation Links */}
                            <nav className="flex flex-col space-y-4 items-center">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "text-lg transition-colors hover:text-primary",
                                            pathname === item.href
                                                ? "text-primary font-medium"
                                                : "text-muted-foreground"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>

                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}