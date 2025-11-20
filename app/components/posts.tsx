import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts({ count = 9 }) {
  let allBlogs = getBlogPosts()
  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        }).splice(0, count)
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-3"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 justify-between">

              <p className="text-neutral-900 underline dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>

              <p className="dark:text-neutral-500">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            </div>
          </Link>

        ))
      }
      {count === 9 && <Link className='mt-2' href={'/blog/'}> 📎 点击查看所有笔记</Link>}
    </div>
  )
}
