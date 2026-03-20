import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

export async function GET() {
  let allBlogs = await getBlogPosts()

  const latestDate = allBlogs.length
    ? allBlogs
        .map((post) => new Date(post.metadata.publishedAt))
        .sort((a, b) => b.getTime() - a.getTime())[0]
        .toUTCString()
    : new Date().toUTCString()

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
          <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>李宇博客</title>
        <link>${baseUrl}</link>
        <description>李宇的个人博客 RSS，收录最新文章与笔记。</description>
        <language>zh-CN</language>
        <lastBuildDate>${latestDate}</lastBuildDate>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
