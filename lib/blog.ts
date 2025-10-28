export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  content: string
  image?: string
}

// Mock data - thay thế bằng CMS hoặc Markdown files
export const blogPosts: BlogPost[] = [
  {
    slug: "mastering-react-server-components",
    title: "Mastering React Server Components",
    description: "Deep dive into React Server Components and how they change the way we build web applications.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "Next.js", "Performance"],
    image: "/image/react.png",
    content: `
# Mastering React Server Components

React Server Components represent a paradigm shift in how we build React applications...

## What are Server Components?

Server Components allow you to render components on the server...

## Benefits

- **Performance**: Reduced bundle size
- **SEO**: Better search engine optimization
- **Data Fetching**: Simplified data fetching patterns

## Getting Started

\`\`\`tsx
// app/page.tsx
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data.title}</div>
}
\`\`\`

## Conclusion

Server Components are the future of React development...
    `
  },
  {
    slug: "building-scalable-nextjs-apps",
    title: "Building Scalable Next.js Applications",
    description: "Best practices and patterns for building large-scale Next.js applications with App Router.",
    date: "2024-01-10",
    readTime: "10 min read",
    tags: ["Next.js", "Architecture", "Best Practices"],
    image: "/image/scalable.png",
    content: `
# Building Scalable Next.js Applications

Learn how to architect Next.js apps that scale...
    `
  },
  {
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns",
    description: "Explore advanced TypeScript patterns and techniques to write better, safer code.",
    date: "2024-01-05",
    readTime: "12 min read",
    tags: ["TypeScript", "Patterns", "Advanced"],
    image: "/image/typescript.png",
    content: `
# Advanced TypeScript Patterns

TypeScript offers powerful type system features...
    `
  },
  {
    slug: "css-in-js-vs-tailwind",
    title: "CSS-in-JS vs Tailwind CSS",
    description: "A comprehensive comparison of styling approaches in modern React applications.",
    date: "2024-01-01",
    readTime: "6 min read",
    tags: ["CSS", "Tailwind", "Styling"],
    image: "/image/tailwindcss.png",
    content: `
# CSS-in-JS vs Tailwind CSS

Choosing the right styling solution...
    `
  },
]

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => post.tags.some(tag => currentPost.tags.includes(tag)))
    .slice(0, limit)
}
