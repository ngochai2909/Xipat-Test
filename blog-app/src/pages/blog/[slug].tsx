import { GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { BlogPost } from "../../types/blog"
import {
  fetchPosts,
  fetchPostById,
  transformPostToBlogPost,
  createSlug
} from "../../utils/blogUtils"

interface BlogPostPageProps {
  post: BlogPost | null
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>404</h1>
          <p className='text-gray-600 mb-8'>Blog post not found</p>
          <Link
            href='/'
            className='bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors'
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} - Blog App</title>
        <meta name='description' content={post.excerpt} />
        <meta name='keywords' content={`blog, article, ${post.title}`} />
        <meta property='og:title' content={`${post.title} - Blog App`} />
        <meta property='og:description' content={post.excerpt} />
        <meta property='og:type' content='article' />
        <meta property='article:author' content={post.author.name} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={`${post.title} - Blog App`} />
        <meta name='twitter:description' content={post.excerpt} />
        <link
          rel='canonical'
          href={`${process.env.NEXT_PUBLIC_SITE_URL || ""}/blog/${post.slug}-${
            post.id
          }`}
        />
      </Head>

      <div className='min-h-screen bg-gray-50'>
        {/* Header */}
        <header className='bg-white shadow-sm border-b'>
          <div className='max-w-4xl mx-auto px-4 py-6'>
            <Link
              href='/'
              className='inline-flex items-center text-blue-600 hover:text-blue-700 mb-4'
            >
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              Back to Blog
            </Link>
            <h1 className='text-2xl font-bold text-gray-900'>Blog App</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className='max-w-4xl mx-auto px-4 py-8'>
          <article className='bg-white rounded-lg shadow-lg overflow-hidden'>
            {/* Article Header */}
            <header className='px-8 py-6 border-b'>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight'>
                {post.title}
              </h1>

              <div className='flex items-center justify-between text-sm text-gray-600'>
                <div className='flex items-center'>
                  <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3'>
                    {post.author.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className='font-medium text-gray-900'>
                      {post.author.name}
                    </p>
                    <p className='text-gray-500'>@{post.author.username}</p>
                  </div>
                </div>

                <div className='text-right'>
                  <p>Post #{post.id}</p>
                  <p>User ID: {post.userId}</p>
                </div>
              </div>
            </header>

            {/* Article Body */}
            <div className='px-8 py-6'>
              <div className='prose prose-lg max-w-none'>
                <p className='text-gray-700 leading-relaxed text-lg'>
                  {post.body}
                </p>
              </div>
            </div>

            {/* Article Footer */}
            <footer className='px-8 py-6 bg-gray-50 border-t'>
              <div className='flex flex-wrap gap-2'>
                <span className='inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>
                  Article
                </span>
                <span className='inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full'>
                  Blog Post
                </span>
                <span className='inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full'>
                  User {post.userId}
                </span>
              </div>
            </footer>
          </article>

          {/* Author Info */}
          <div className='mt-8 bg-white rounded-lg shadow-lg p-6'>
            <h3 className='text-xl font-semibold mb-4'>About the Author</h3>
            <div className='flex items-start'>
              <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4'>
                {post.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className='text-lg font-medium text-gray-900'>
                  {post.author.name}
                </h4>
                <p className='text-gray-600'>@{post.author.username}</p>
                <p className='text-gray-600'>{post.author.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className='mt-8 text-center'>
            <Link
              href='/'
              className='bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center'
            >
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              Back to All Posts
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className='bg-white border-t mt-16'>
          <div className='max-w-4xl mx-auto px-4 py-8'>
            <div className='text-center text-gray-600'>
              <p>&copy; 2025 XIPAT. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await fetchPosts()

    const paths = posts.map((post) => ({
      params: {
        slug: `${createSlug(post.title)}-${post.id}`
      }
    }))

    return {
      paths,
      fallback: "blocking"
    }
  } catch (error) {
    console.error("Error in getStaticPaths:", error)
    return {
      paths: [],
      fallback: "blocking"
    }
  }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({
  params
}) => {
  try {
    if (!params?.slug || typeof params.slug !== "string") {
      return { notFound: true }
    }

    const slugParts = params.slug.split("-")
    const postId = parseInt(slugParts[slugParts.length - 1])

    if (isNaN(postId)) {
      return { notFound: true }
    }

    const post = await fetchPostById(postId)

    if (!post) {
      return { notFound: true }
    }

    const blogPost = transformPostToBlogPost(post)

    const expectedSlug = `${blogPost.slug}-${blogPost.id}`
    if (params.slug !== expectedSlug) {
      return { notFound: true }
    }

    return {
      props: {
        post: blogPost
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error("Error fetching post:", error)
    return { notFound: true }
  }
}
