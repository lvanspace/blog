import { Metadata } from "next";
import { BlogPosts } from "app/components/posts";
import { baseUrl } from "./sitemap";
import { LogoBoom } from "./components/logo";

export const metadata: Metadata = {
  title: "李宇Blog · 见字如面",
  description: "李宇的个人博客，记录产品、技术、摄影与生活的笔记与想法。",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "李宇Blog · 见字如面",
    siteName: "李宇Blog",
    url: baseUrl,
  },
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        <LogoBoom />
      </h1>
      <p className="mb-4" style={{ lineHeight: 2 }}>全栈开发工程师、科技爱好者。<br/>这里存放我的笔记、想法，一切我想分享的东西。<br/>联系方式:&nbsp;&nbsp;&nbsp;liyupeace@gmail.com</p>
      <div className="my-8">
        <div className="font-bold text-lg pb-4">📔 最近笔记</div>
        <BlogPosts />
      </div>
    </section>
  );
}
