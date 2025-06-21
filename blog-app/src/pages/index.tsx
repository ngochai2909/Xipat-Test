import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { BlogPost } from "../types/blog"
import { fetchPosts, transformPostToBlogPost } from "../utils/blogUtils"

interface BlogPageProps {
  posts: BlogPost[]
  totalPosts: number
}

const POSTS_PER_PAGE = 10

export default function BlogPage({ posts, totalPosts }: BlogPageProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <Head>
        <title>Blog App - Latest Posts</title>
        <meta
          name='description'
          content='Discover the latest blog posts and articles on various topics'
        />
        <meta
          name='keywords'
          content='blog, articles, posts, technology, lifestyle'
        />
        <meta property='og:title' content='Blog App - Latest Posts' />
        <meta
          property='og:description'
          content='Discover the latest blog posts and articles on various topics'
        />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Blog App - Latest Posts' />
        <meta
          name='twitter:description'
          content='Discover the latest blog posts and articles on various topics'
        />
      </Head>

      <div className='min-h-screen bg-gray-50'>
        {/* Header */}
        <header className='bg-white shadow-sm border-b'>
          <div className='max-w-6xl mx-auto px-4 py-6'>
            <h1 className='text-3xl font-bold text-gray-900'>XIPAT Blog App</h1>
            <p className='text-gray-600 mt-2'>
              Discover amazing content and stories
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className='max-w-6xl mx-auto px-4 py-8'>
          {/* Posts Grid */}
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {currentPosts.map((post) => (
              <article
                key={post.id}
                className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'
              >
                <div className='p-6'>
                  <h2 className='text-xl font-semibold mb-3 text-gray-900 line-clamp-2'>
                    {post.title}
                  </h2>

                  <p className='text-gray-600 mb-4 line-clamp-3'>
                    {post.excerpt}
                  </p>

                  <div className='flex items-center justify-between'>
                    <div className='text-sm text-gray-500'>
                      <span>By {post.author.name}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}-${post.id}`}
                      className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='mt-12 flex justify-center'>
              <nav className='flex items-center space-x-2'>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className='px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className='bg-white border-t mt-16'>
          <div className='max-w-6xl mx-auto px-4 py-8'>
            <div className='text-center text-gray-600'>
              <p>&copy; 2025 XIPAT. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  try {
    const posts = await fetchPosts()

    const blogPosts = posts.map((post) => {
      return transformPostToBlogPost(post)
    })

    return {
      props: {
        posts: blogPosts,
        totalPosts: blogPosts.length
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error("Error fetching posts:", error)
    return {
      props: {
        posts: [],
        totalPosts: 0
      },
      revalidate: 60
    }
  }
}
