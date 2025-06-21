export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface BlogPost extends Post {
  author: {
    id: number
    name: string
    username: string
    email: string
  }
  slug: string
  excerpt: string
}
