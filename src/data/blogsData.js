const BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=600&q=80",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80",
  "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
  "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=600&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
];

const DEFAULT_BLOG_LINK = "https://techbymohitkr.blogspot.com/";

/** Generate URL-safe slug from title */
export function slugify(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "post";
}

/** Build full blog content from excerpt/title/tag for default posts */
function defaultContent(title, excerpt, tag) {
  return `${excerpt}\n\nIn this post I share practical tips and patterns around **${title}**. Whether you're building ${tag} solutions or exploring the stack, these ideas should help you ship better.\n\nIf you have questions or want to go deeper, drop a comment or reach out. Thanks for reading — more on this topic on the blog.`;
}

const RAW_BLOGS = [
  { title: "Full Stack Development & Modern Web", excerpt: "Thoughts on building scalable web applications, React, Node.js, and clean architecture.", date: "Jan 2024", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Web Dev" },
  { title: "Mobile Apps with Flutter", excerpt: "Building cross-platform apps, UI/UX in Flutter, and shipping with Ekions.", date: "Jan 2024", image: BLOG_IMAGES[1], link: DEFAULT_BLOG_LINK, tag: "Mobile" },
  { title: "ERP, Systems & Scalability", excerpt: "Enterprise solutions, ERP modules, and designing for growth.", date: "Feb 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Systems" },
  { title: "React Hooks Deep Dive", excerpt: "Understanding useState, useEffect, and custom hooks for cleaner components.", date: "Feb 2024", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "React" },
  { title: "Node.js Backend Best Practices", excerpt: "REST APIs, error handling, and scaling Node applications.", date: "Mar 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Backend" },
  { title: "Building Custom ERP Modules", excerpt: "From requirements to deployment for business logic modules.", date: "Mar 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "ERP" },
  { title: "Next.js and SSR", excerpt: "Server-side rendering and static generation for performance.", date: "Apr 2024", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Next.js" },
  { title: "Flutter State Management", excerpt: "Provider, Riverpod, and Bloc patterns compared.", date: "Apr 2024", image: BLOG_IMAGES[1], link: DEFAULT_BLOG_LINK, tag: "Flutter" },
  { title: "MongoDB Schema Design", excerpt: "Document modeling and indexing for real-world apps.", date: "May 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Database" },
  { title: "REST vs GraphQL", excerpt: "When to choose which API style for your product.", date: "May 2024", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "API" },
  { title: "HRMS from Scratch", excerpt: "Designing leave, attendance, and payroll modules.", date: "Jun 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "HRMS" },
  { title: "Clean Code in JavaScript", excerpt: "Readable, maintainable code and naming conventions.", date: "Jun 2024", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "JavaScript" },
  { title: "Deploying on Vercel", excerpt: "CI/CD, env vars, and serverless functions.", date: "Jul 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "DevOps" },
  { title: "UI/UX for Mobile Apps", excerpt: "Design patterns that improve conversion and retention.", date: "Jul 2024", image: BLOG_IMAGES[1], link: DEFAULT_BLOG_LINK, tag: "Mobile" },
  { title: "Web3 and Smart Contracts", excerpt: "Intro to Ethereum and writing simple contracts.", date: "Aug 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Web3" },
  { title: "TypeScript for React", excerpt: "Typing props, hooks, and reducers correctly.", date: "Aug 2024", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "TypeScript" },
  { title: "URL Shorteners and Analytics", excerpt: "Building a short link service with click tracking.", date: "Sep 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Full Stack" },
  { title: "LMS: Courses and Quizzes", excerpt: "Structuring content and assessments for online learning.", date: "Sep 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "LMS" },
  { title: "Authentication Best Practices", excerpt: "JWT, refresh tokens, and secure session handling.", date: "Oct 2024", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Security" },
  { title: "Performance Optimization", excerpt: "Lazy loading, code splitting, and caching strategies.", date: "Oct 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Performance" },
  { title: "Building a Portfolio Site", excerpt: "React, routing, and showcasing projects effectively.", date: "Nov 2024", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Web Dev" },
  { title: "State Management in Large Apps", excerpt: "Redux, Zustand, and when to use global state.", date: "Nov 2024", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "React" },
  { title: "Microservices vs Monolith", excerpt: "Trade-offs and when to split your backend.", date: "Dec 2024", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Architecture" },
  { title: "Flutter Animations", excerpt: "Implicit and explicit animations for polished UIs.", date: "Dec 2024", image: BLOG_IMAGES[1], link: DEFAULT_BLOG_LINK, tag: "Flutter" },
  { title: "Database Migrations", excerpt: "Versioning schema changes safely in production.", date: "Jan 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Database" },
  { title: "API Rate Limiting", excerpt: "Protecting your backend from abuse and cost spikes.", date: "Jan 2025", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Backend" },
  { title: "Responsive Design Patterns", excerpt: "Mobile-first and breakpoint strategies.", date: "Feb 2025", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "CSS" },
  { title: "Testing React Components", excerpt: "Jest and React Testing Library basics.", date: "Feb 2025", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Testing" },
  { title: "Docker for Developers", excerpt: "Containers for local and deployed environments.", date: "Mar 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "DevOps" },
  { title: "Blockchain Basics", excerpt: "Consensus, hashing, and use cases beyond crypto.", date: "Mar 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Blockchain" },
  { title: "Building Admin Dashboards", excerpt: "Tables, filters, and role-based access.", date: "Apr 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Dashboard" },
  { title: "C++ for Systems Programming", excerpt: "Memory, pointers, and low-level optimization.", date: "Apr 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "C++" },
  { title: "Progressive Web Apps", excerpt: "Service workers, offline support, and installability.", date: "May 2025", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "PWA" },
  { title: "Scaling PostgreSQL", excerpt: "Indexes, connection pooling, and read replicas.", date: "May 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Database" },
  { title: "Git Workflow and CI", excerpt: "Branches, PRs, and automated checks.", date: "Jun 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "DevOps" },
  { title: "Accessibility in Web Apps", excerpt: "ARIA, keyboard nav, and screen reader support.", date: "Jun 2025", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "A11y" },
  { title: "Real-time with WebSockets", excerpt: "Chat, notifications, and live updates.", date: "Jul 2025", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Real-time" },
  { title: "Design Systems", excerpt: "Components, tokens, and consistency at scale.", date: "Jul 2025", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Design" },
  { title: "Serverless Functions", excerpt: "AWS Lambda, Vercel, and event-driven logic.", date: "Aug 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Serverless" },
  { title: "Mobile App Monetization", excerpt: "Ads, in-app purchases, and subscriptions.", date: "Aug 2025", image: BLOG_IMAGES[1], link: DEFAULT_BLOG_LINK, tag: "Mobile" },
  { title: "Error Handling and Logging", excerpt: "Structured logs and monitoring in production.", date: "Sep 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Backend" },
  { title: "CSS-in-JS vs Tailwind", excerpt: "Styling approaches for modern React apps.", date: "Sep 2025", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "CSS" },
  { title: "Building SaaS Products", excerpt: "Multi-tenancy, billing, and onboarding flows.", date: "Oct 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "SaaS" },
  { title: "QR Codes and Deep Linking", excerpt: "Mobile campaigns and app install flows.", date: "Oct 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Mobile" },
  { title: "Code Review Culture", excerpt: "Giving and receiving feedback that improves quality.", date: "Nov 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Process" },
  { title: "Vue vs React in 2025", excerpt: "Ecosystem and developer experience comparison.", date: "Nov 2025", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Frontend" },
  { title: "Startup Tech Stack", excerpt: "Choosing tools that scale with your team and users.", date: "Dec 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Startup" },
  { title: "Freelancing as a Developer", excerpt: "Clients, contracts, and time management.", date: "Dec 2025", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Career" },
  { title: "Ekions and Flutter Apps", excerpt: "Building high-class mobile experiences for startups.", date: "Jan 2026", image: BLOG_IMAGES[1], link: DEFAULT_BLOG_LINK, tag: "Ekions" },
  { title: "Custom Web Apps for Business", excerpt: "From idea to deployment for SMBs.", date: "Jan 2026", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Web Dev" },
  { title: "Founder to Full Stack", excerpt: "Balancing product and code as a solo founder.", date: "Jan 2026", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Founder" },
  { title: "Learning in Public", excerpt: "Blogging and sharing progress as a developer.", date: "Jan 2026", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Career" },
  { title: "API Design for Mobile", excerpt: "Versioning, pagination, and battery-friendly endpoints.", date: "Feb 2026", image: BLOG_IMAGES[1], link: DEFAULT_BLOG_LINK, tag: "API" },
  { title: "From Diploma to Developer", excerpt: "My path from Parul University to full stack.", date: "Feb 2026", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Career" },
  { title: "Vadodara Tech Scene", excerpt: "Local meetups and building in Gujarat.", date: "Feb 2026", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Community" },
  { title: "Internship to Industry", excerpt: "Lessons from Celebal, Celestix, and Custom Neon.", date: "Mar 2026", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Career" },
  { title: "Side Projects That Ship", excerpt: "Finishing and launching without burning out.", date: "Mar 2026", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Productivity" },
  { title: "Open Source First Steps", excerpt: "Contributing to projects and maintaining your own.", date: "Mar 2026", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Open Source" },
  { title: "Remote Work Setup", excerpt: "Desk, tools, and focus as a remote developer.", date: "Apr 2026", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Remote" },
  { title: "Interview Prep for Full Stack", excerpt: "DSA, system design, and project discussions.", date: "Apr 2026", image: BLOG_IMAGES[0], link: DEFAULT_BLOG_LINK, tag: "Career" },
  { title: "Building in Public", excerpt: "Sharing progress on Akions and new products.", date: "Apr 2026", image: BLOG_IMAGES[2], link: DEFAULT_BLOG_LINK, tag: "Founder" },
];

/** Default blogs with slug and content for on-site reading */
export const DEFAULT_BLOGS = RAW_BLOGS.map((b) => ({
  ...b,
  slug: slugify(b.title),
  content: defaultContent(b.title, b.excerpt, b.tag),
}));

export const BLOG_STORAGE_KEY = "mohit_portfolio_blogs";
