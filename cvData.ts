import {
  Github,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Sparkles,
  Cpu,
  Database,
  PencilRuler,
  Server,
  Code,
  Globe,
  BookOpenCheck
} from 'lucide-react';

export const skillLinks: Record<string, string> = {
  // Languages
  "Javascript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  "Typescript": "https://www.typescriptlang.org/",
  "C#": "https://learn.microsoft.com/en-us/dotnet/csharp/",
  "Python": "https://www.python.org/",

  // Technologies
  "React.js": "https://react.dev/",
  "Vue 3": "https://vuejs.org/",
  "Nuxt.js": "https://nuxt.com/",
  "Next.js": "https://nextjs.org/",
  "Node.js": "https://nodejs.org/",
  "Webpack": "https://webpack.js.org/",
  "Vite": "https://vitejs.dev/",
  "Docker": "https://www.docker.com/",

  // UI Libraries
  "Shaden UI": "https://ui.shadcn.com/",
  "Antd": "https://ant.design/",
  "TailwindCSS": "https://tailwindcss.com/",
  "Element Plus": "https://element-plus.org/",

  // State Management
  "Zustand": "https://zustand-demo.pmnd.rs/",
  "Redux": "https://redux.js.org/",
  "Pinia": "https://pinia.vuejs.org/",
  "TanStack Query": "https://tanstack.com/query",

  // Database
  "MySQL": "https://www.mysql.com/"
};

export const cvData = {
  personalInfo: {
    name: "Pham Huy Hoang",
    github: "github.com/juniordev203",
    email: "huyhoangpham8460@gmail.com",
    phone: "0367 435 069",
  },
  introduction: [
    "I am a Front-End Developer with 1.5+ years of hands-on experience specializing in creating high-performance, user-centric web applications with the modern JavaScript ecosystem (React, Next.js, Vue 3, TypeScript).",
    "Proven ability to translate complex UI/UX designs into responsive, interactive, and scalable products.",
    "Eager to contribute to a collaborative team and solve challenging technical problems."
  ],
  education: {
    icon: GraduationCap,
    title: "Education",
    university: "National Economics University",
    major: "Information Technology",
    duration: "Sep. 2021 Aug. 2025"
  },
  experience: {
    icon: Briefcase,
    title: "Experience",
    items: [
      {
        company: "Kaopiz Software",
        role: "Frontend Developer",
        duration: "Dec 2025 Present",
        description: "An internal platform designed for managing and booking meeting rooms and company equipment.",
        technologies: "Vue 3, TypeScript, TanStack Query, Vite.",
        contributions: [
          "Architected the frontend foundation (Base FE) from scratch. Established a scalable project structure, integrated global state management, and configured centralized API handling.",
          "Optimization: Leveraged TanStack Query for efficient server-state management, implementing caching strategies to enhance system performance and data synchronization."
        ]
      },
      {
        company: "Outsource-team",
        role: "Sm-WorkOS Teamlead Front-End",
        duration: "Jun 2025 Dec 2025",
        description: "Sm-WorkOS is a customizable task management module within an internal management platform. It allows administrators to create task types, define custom fields, and build automated workflows for managing internal processes.",
        technologies: "Next.js, TypeScript, TanStack Query, Zustand, React Hook Form, Zod, WebSocket.",
        contributions: [
          "Dynamic Form & Workflow Engine: Architected a dynamic form builder that enables admins to define task fields and assign validation rules. Integrated drag-and-drop UI for workflow customization.",
          "Real-time Kanban Board: Developed an intelligent Kanban board using WebSocket and optimistic UI updates for seamless real-time interactions. Implemented validation logic to prevent invalid state transitions.",
          "Optimization: Improved rendering efficiency and reduced data fetching latency by integrating TanStack Query and memoized hooks."
        ]
      },
      {
        company: "CDTM-Company",
        role: "Projenti - Frontend Developer",
        link: "projenti.cdtm-ito.org",
        duration: "Sep 2024 Oct 2025",
        description: "Projenti is an all-in-one project management platform designed for software teams to track progress using Agile methods and monitor server performance in real time.",
        technologies: "Next.js, TypeScript, Next Auth, TanStack Query, Husky, ESLint, Prettier.",
        contributions: [
          "Authentication & User Management: Implemented secure authentication and role-based access control using Next Auth. Built an admin panel for managing users, pagination, and permission handling.",
          "Kanban Board: Developed a drag-and-drop Kanban system with optimistic updates and rollback handling, enhancing user experience during task management.",
          "Code Quality: Configured ESLint, Prettier, and Husky for consistent code formatting and quality enforcement across the team."
        ]
      },
      {
        company: "Thien Ha Xanh",
        role: "TryHSK - Intern Front-End Developer",
        link: "tryhsk.com",
        duration: "Jul 2024 Aug 2024",
        description: "TryHSK is Vietnam's leading HSK exam preparation platform, providing a wide variety of questions and practice tests for learners from HSK 1 to HSK 6.",
        technologies: "Vue.js, Element Plus, RESTful API.",
        contributions: [
          "Responsibilities: Developed UI components for question pages, integrated RESTful APIs to fetch and render dynamic question sets, and optimized data handling for faster page loading."
        ]
      }
    ]
  },
  skills: {
    icon: Cpu,
    title: "Programming Skills",
    categories: [
      { name: "Languages", items: ["Javascript", "Typescript", "C#", "Python"], icon: Code },
      { name: "Technologies", items: ["React.js", "Vue 3", "Nuxt.js", "Next.js", "Node.js", "Webpack", "Vite", "Docker"], icon: Globe },
      { name: "UI Libraries", items: ["Shaden UI", "Antd", "TailwindCSS", "Element Plus"], icon: PencilRuler },
      { name: "State Management", items: ["Zustand", "Redux", "Pinia", "TanStack Query"], icon: Server },
      { name: "Database", items: ["MySQL"], icon: Database },
      { name: "English", items: ["Proficient in reading documentation"], icon: BookOpenCheck }
    ]
  }
};