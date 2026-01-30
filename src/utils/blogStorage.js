import { DEFAULT_BLOGS, BLOG_STORAGE_KEY, slugify } from "../data/blogsData";

export function getStoredBlogs() {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function saveStoredBlogs(blogs) {
  try {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogs));
    return true;
  } catch (e) {
    return false;
  }
}

export function getAllBlogs() {
  const stored = getStoredBlogs();
  return [...stored, ...DEFAULT_BLOGS];
}

/** Get a single blog by slug (checks stored first, then default list) */
export function getBlogBySlug(slug) {
  if (!slug) return null;
  const normalized = String(slug).trim().toLowerCase();
  const stored = getStoredBlogs();
  const fromStored = stored.find((b) => (b.slug || slugify(b.title)).toLowerCase() === normalized);
  if (fromStored) return fromStored;
  return DEFAULT_BLOGS.find((b) => b.slug.toLowerCase() === normalized) || null;
}

export function getStoredBlogById(id) {
  return getStoredBlogs().find((b) => b.id === id) || null;
}

export function addBlog(blog) {
  const stored = getStoredBlogs();
  const slug = (blog.slug && blog.slug.trim()) ? slugify(blog.slug) : slugify(blog.title || "post");
  const content = (blog.content && blog.content.trim()) ? blog.content.trim() : (blog.excerpt || "No content.");
  const now = new Date();
  const publishedAt = blog.publishedAt || now.toISOString().slice(0, 19).replace("T", " ");
  const newBlog = {
    ...blog,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    title: blog.title || "",
    excerpt: blog.excerpt || "",
    slug,
    content,
    image: blog.image || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
    link: blog.link || "https://techbymohitkr.blogspot.com/",
    tag: blog.tag || blog.category || "Blog",
    category: blog.category || blog.tag || "Blog",
    author: blog.author || "Admin",
    status: blog.status || "Published",
    publishedAt,
    date: blog.date || now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    metaTitle: blog.metaTitle || "",
    metaDescription: blog.metaDescription || "",
    tags: Array.isArray(blog.tags) ? blog.tags : (blog.tags ? [blog.tags] : []),
  };
  stored.unshift(newBlog);
  saveStoredBlogs(stored);
  return newBlog;
}

export function updateBlog(id, data) {
  const stored = getStoredBlogs();
  const idx = stored.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  const existing = stored[idx];
  const slug = (data.slug && data.slug.trim()) ? slugify(data.slug) : (data.title ? slugify(data.title) : existing.slug);
  const updated = {
    ...existing,
    ...data,
    slug,
    content: (data.content != null && data.content.trim()) ? data.content.trim() : existing.content,
  };
  stored[idx] = updated;
  saveStoredBlogs(stored);
  return updated;
}

export function deleteStoredBlog(id) {
  const stored = getStoredBlogs().filter((b) => b.id !== id);
  saveStoredBlogs(stored);
  return stored;
}
