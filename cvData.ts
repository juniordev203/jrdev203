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
  "React.Js": "https://react.dev/",
  "NuxtJs": "https://nuxt.com/",
  "Next.Js": "https://nextjs.org/",
  "NodeJs": "https://nodejs.org/",
  "Webpack": "https://webpack.js.org/",
  "Vite": "https://vitejs.dev/",
  "Docker": "https://www.docker.com/",

  // UI Libraries
  "Shadcn UI": "https://ui.shadcn.com/",
  "Antd": "https://ant.design/",
  "Tailwindcss": "https://tailwindcss.com/",
  "Element Plus": "https://element-plus.org/",

  // State Management
  "Zustand": "https://zustand-demo.pmnd.rs/",
  "Redux": "https://redux.js.org/",
  "Pinia": "https://pinia.vuejs.org/",

  // Database
  "MySQL": "https://www.mysql.com/"
};

export const cvData = {
  personalInfo: {
    name: "Pham Huy Hoang",
    github: "https://github.com/juniordev203",
    email: "huyhoangpham8460@gmail.com",
    phone: "0367435069",
  },
  introduction: [
    "I am a Front-End Developer with 1.5 years of hands-on experience specializing in creating high-performance, user-centric web applications with the modern JavaScript ecosystem (React, Next.js, TypeScript).",
    "Proven ability to translate complex UI/UX designs into responsive, interactive, and scalable products.",
    "Eager to contribute to a collaborative team and solve challenging technical problems."
  ],
  education: {
    icon: GraduationCap,
    title: "Education",
    university: "National Economics University",
    major: "Information Technology",
    duration: "Sep. 2021 – Aug. 2025"
  },
  experience: {
    icon: Briefcase,
    title: "Experience",
    items: [
      {
        company: "Outsource-team",
        role: "Sm-WorkOS – Teamlead Front-End",
        duration: "Jun 2025 – Oct 2025",
        description: "Sm-WorkOS is a customizable task management module within an internal management platform. It allows administrators to create task types, define custom fields, and build automated workflows for managing internal processes.",
        technologies: "Next.js, TypeScript, TanStack Query, Zustand, React Hook Form, Zod, WebSocket.",
        contributions: [
          "Dynamic Form & Workflow Engine: Architected a dynamic form builder that enables admins to define task fields (text, number, date, etc.) and assign validation rules. Integrated drag-and-drop UI for workflow customization, improving internal process automation.",
          "Real-time Kanban Board: Developed an intelligent Kanban board using WebSocket and optimistic UI updates for seamless real-time interactions. Implemented validation logic to prevent invalid state transitions, improving data integrity.",
          "Optimization: Improved rendering efficiency and reduced data fetching latency by integrating TanStack Query and memoized hooks."
        ]
      },
      {
        company: "CDTM-Company",
        role: "Projenti – Frontend Developer",
        duration: "Sep 2024 – May 2025",
        description: "Projenti is an all-in-one project management platform designed for software teams to track progress using Agile methods and monitor server performance in real time.",
        technologies: "Next.js, TypeScript, Next Auth, TanStack Query, Husky, ESLint, Prettier.",
        contributions: [
          "Authentication & User Management: Implemented secure authentication and role-based access control using NextAuth. Built an admin panel for managing users, pagination, and permission handling.",
          "Kanban Board: Developed a drag-and-drop Kanban system with optimistic updates and rollback handling, enhancing user experience during task management.",
          "Code Quality: Configured ESLint, Prettier, and Husky for consistent code formatting and quality enforcement across the team."
        ]
      },
      {
        company: "CDTM-Company",
        role: "CDTM Landingpage – Frontend Developer",
        duration: "Jan 2025 – Apr 2025",
        description: "CDTM Landingpage is the company's main marketing website, developed to showcase its core services with an emphasis on design performance and aesthetics.",
        technologies: "Next.js, TailwindCSS, Framer Motion.",
        contributions: [
          "Performance & Animation: Built the full UI from Figma design. Implemented smooth-scroll and parallax effects, achieving PageSpeed scores above 90 on both desktop and mobile."
        ]
      },
      {
        company: "Thien Ha Xanh",
        role: "TryHSK – Intern Front-End Developer",
        link: "https://tryhsk.com/",
        duration: "Jul 2024 – Aug 2024",
        description: "TryHSK is Vietnam's leading HSK exam preparation platform, providing a wide variety of questions and practice tests for learners from HSK 1 to HSK 6.",
        technologies: "Vue.js, Element Plus, RESTful API.",
        contributions: [
          "Responsibilities: Developed UI components for question pages, integrated RESTful APIs to fetch and render dynamic question sets, and optimized data handling for faster page loading."
        ]
      }
    ]
  },
  projects: {
    icon: Sparkles,
    title: "Personal Projects",
    items: [
      {
        name: "E-learning: Flashduo",
        role: "Mobile Developer",
        duration: "Mar 2024 – Present",
        description: "Flashduo is an E-learning mobile app built for vocabulary and TOEIC preparation based on the flashcard learning model. It provides users with custom collections, visual memory aids, and real-exam simulations.",
        technologies: "Nuxt.js, .NET Core, Capacitor Framework, TailwindCSS, Element Plus.",
        contributions: [
          "Built the user interface with Nuxt.js and TailwindCSS. Implemented JWT authentication for secure login and managed user data synchronization across sessions."
        ]
      }
    ]
  },
  skills: {
    icon: Cpu,
    title: "Programming Skills",
    categories: [
      { name: "Languages", items: ["Javascript", "Typescript", "C#", "Python"], icon: Code },
      { name: "Technologies", items: ["React.Js", "NuxtJs", "Next.Js", "NodeJs", "Webpack", "Vite", "Docker"], icon: Globe },
      { name: "UI Libraries", items: ["Shadcn UI", "Antd", "Tailwindcss", "Element Plus"], icon: PencilRuler },
      { name: "State Management", items: ["Zustand", "Redux", "Pinia"], icon: Server },
      { name: "Database", items: ["MySQL"], icon: Database },
      { name: "English", items: ["Proficient in reading documentation"], icon: BookOpenCheck }
    ]
  }
};
