import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Github,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Download,
    ExternalLink
} from "lucide-react"
import ProjectCard from "@/components/shared/ProjectCard"
import GitHubStats from "@/components/shared/GitHubStats"

// Dữ liệu mẫu - thay thế bằng thông tin thật của bạn
const personalInfo = {
    name: "JuniorDev203",
    title: "Front-end Developer",
    description: "Passionate về việc tạo ra những ứng dụng web hiện đại và user-friendly. Luôn học hỏi công nghệ mới và cải thiện kỹ năng lập trình.",
    avatar: "/image/avatar.jpg", // Thay bằng ảnh thật
    email: "huyhoangpham8460@gmail.com",
    phone: "+84 367 435 069",
    location: "Hà Nội, Việt Nam",
    github: "https://github.com/juniordev203",
    linkedin: "https://www.linkedin.com/in/huy-ho%C3%A0ng-5a060b255/",
    resume: "/resume.pdf" // Link đến CV PDF
}

const technologies = [
    {
        id: 2,
        name: "React",
        link: "https://reactjs.org/",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg"
    },
    {
        id: 3,
        name: "Next.js",
        link: "https://nextjs.org/",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg"
    },
    {
        id: 1,
        name: "Typescript",
        link: "https://www.typescriptlang.org/",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg"
    },
    {
        id: 4,
        name: "Node.js",
        link: "https://nodejs.org/",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@9.21.0/icons/nodedotjs.svg"
    },
    {
        id: 5,
        name: "Tailwind CSS",
        link: "https://tailwindcss.com/",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg"
    },
    {
        id: 6,
        name: "Git",
        link: "https://git-scm.com/",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg"
    }
]

const featuredProjects = [
    {
        title: "E-commerce Website",
        description: "Website thương mại điện tử hoàn chỉnh với giỏ hàng, thanh toán và quản lý sản phẩm.",
        image: "/placeholder-project1.jpg",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
        demoUrl: "https://demo-project1.com",
        sourceUrl: "https://github.com/your-username/project1"
    },
    {
        title: "Task Management App",
        description: "Ứng dụng quản lý công việc với drag & drop, real-time collaboration.",
        image: "/placeholder-project2.jpg",
        technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
        demoUrl: "https://demo-project2.com",
        sourceUrl: "https://github.com/your-username/project2"
    },
    {
        title: "Weather Dashboard",
        description: "Dashboard thời tiết với biểu đồ tương tác và dự báo 7 ngày.",
        image: "/placeholder-project3.jpg",
        technologies: ["Vue.js", "Chart.js", "Express", "Weather API"],
        demoUrl: "https://demo-project3.com",
        sourceUrl: "https://github.com/your-username/project3"
    }
]

export default function HomePage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Personal Info */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-6xl font-bold tracking-wider">
                                    Xin chào, tôi là{" "}
                                    <span className="text-primary">{personalInfo.name}</span>
                                </h1>
                                <h2 className="text-xl lg:text-2xl text-muted-foreground">
                                    {personalInfo.title}
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {personalInfo.description}
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <a href={`mailto:${personalInfo.email}`} className="hover:text-primary">
                                        {personalInfo.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{personalInfo.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{personalInfo.location}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <Button asChild>
                                    <Link href="/contact">
                                        <Mail className="h-4 w-4 mr-2" />
                                        Liên hệ
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href={personalInfo.resume} target="_blank">
                                        <Download className="h-4 w-4 mr-2" />
                                        Tải CV
                                    </Link>
                                </Button>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={personalInfo.github} target="_blank">
                                        <Github className="h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={personalInfo.linkedin} target="_blank">
                                        <Linkedin className="h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-primary/20">
                                <Image
                                    src={personalInfo.avatar}
                                    alt={personalInfo.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section className="py-16 px-4 bg-muted/50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Công nghệ sử dụng</h2>
                        <p className="text-muted-foreground">
                            Các công nghệ và framework tôi làm việc hàng ngày
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        {technologies.map((tech) => (
                            <Badge key={tech.id} variant="outline" className="text-sm py-2 px-4">
                                <a href={tech.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    <Image
                                        src={tech.icon}
                                        alt={tech.name}
                                        width={24}
                                        height={24}
                                        className="h-4 w-4"
                                    />
                                    {tech.name}
                                </a>
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Dự án nổi bật</h2>
                        <p className="text-muted-foreground mb-8">
                            Một số dự án tôi đã thực hiện gần đây
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {featuredProjects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))}
                    </div>
                    <div className="text-center">
                        <Button asChild variant="outline">
                            <Link href="/projects">
                                Xem tất cả dự án
                                <ExternalLink className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* GitHub Activity Section */}
            <section className="py-16 px-4 bg-muted/50">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Hoạt động GitHub</h2>
                        <p className="text-muted-foreground">
                            Commits gần đây của tôi
                        </p>
                    </div>
                    <GitHubStats />
                </div>
            </section>
        </main>
    )
}