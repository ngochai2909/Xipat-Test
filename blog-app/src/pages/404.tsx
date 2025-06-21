import Head from "next/head"
import Link from "next/link"

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Blog App</title>
        <meta
          name='description'
          content='The page you are looking for could not be found.'
        />
        <meta name='robots' content='noindex, nofollow' />
      </Head>

      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center px-4'>
          <div className='mb-8'>
            <h1 className='text-9xl font-bold text-gray-300'>404</h1>
          </div>

          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Page Not Found
          </h2>

          <p className='text-gray-600 mb-8 max-w-md mx-auto'>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className='space-x-4'>
            <Link
              href='/'
              className='bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block'
            >
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className='bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors'
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
