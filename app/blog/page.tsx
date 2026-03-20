import { Metadata } from 'next'
import { BlogPosts } from 'app/components/posts'
import { baseUrl } from 'app/sitemap'

export const metadata: Metadata = {
  title: '笔记归档',
  description: '查看李宇的全部笔记与文章列表。',
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    url: `${baseUrl}/blog`,
  },
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">全部笔记</h1>
      <BlogPosts count={999} />
    </section>
  )
}
