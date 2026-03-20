import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '李宇Blog',
    template: '%s | 李宇Blog',
  },
  description: '李宇的个人博客，记录产品、技术、摄影与生活的笔记与想法。',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', rel: 'shortcut icon', type: 'image/svg+xml' },
    ],
  },
  alternates: {
    canonical: baseUrl,
  },
  authors: [{ name: '李宇' }],
  openGraph: {
    title: '李宇Blog',
    description: '李宇的个人博客，记录产品、技术、摄影与生活的笔记与想法。',
    url: baseUrl,
    siteName: '李宇Blog',
    locale: 'zh_CN',
    type: 'website',
    images: [`${baseUrl}/og?title=${encodeURIComponent('李宇Blog')}`],
  },
  twitter: {
    card: 'summary_large_image',
    title: '李宇Blog',
    description: '李宇的个人博客，记录产品、技术、摄影与生活的笔记与想法。',
    images: [`${baseUrl}/og?title=${encodeURIComponent('李宇Blog')}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

const themeScript = `
(() => {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const apply = () => document.documentElement.classList.toggle('dark', mq.matches);
  apply();
  mq.addEventListener('change', apply);
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="zh-CN"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased mx-auto mt-8 w-full max-w-[720px] px-4 sm:px-6 lg:px-8">
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
        <main className="flex-auto min-w-0 mt-6 flex flex-col w-full">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
