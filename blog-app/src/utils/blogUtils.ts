import { Post, BlogPost } from "../types/blog"

export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim()
}

export function createExcerpt(body: string, maxLength: number = 150): string {
  if (body.length <= maxLength) return body
  return body.substring(0, maxLength).trim() + "..."
}

export function transformPostToBlogPost(post: Post): BlogPost {
  return {
    ...post,
    author: {
      id: 0,
      name: "Hải Nguyễn",
      username: "hainguyen",
      email: "hainn29.dev@gmail.com"
    },
    slug: createSlug(post.title),
    excerpt: createExcerpt(post.body)
  }
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  return response.json()
}

export async function fetchPostById(id: number): Promise<Post | null> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    )
    if (!response.ok) {
      return null
    }
    return response.json()
  } catch {
    return null
  }
}
