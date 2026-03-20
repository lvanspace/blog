import { Metadata } from "next";
import { BlogPosts } from "app/components/posts";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  title: "见字如面",
  description: "李宇的个人博客，记录产品、技术、摄影与生活的笔记与想法。",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    url: baseUrl,
  },
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
      见字如面，李宇 Blog。
      </h1>
      <p className="mb-4">{`这里存放我的笔记，想法，一切我想分享的东西。`}</p>
      <div className="my-8">
        <div className="font-bold text-lg pb-4">📔 最近笔记</div>
        <BlogPosts />
      </div>
    </section>
  );
}
