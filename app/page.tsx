import { BlogPosts } from "app/components/posts";

import Record from "./components/record";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        你好，来到 李宇 Blog。
      </h1>
      <p className="mb-4">{`这里存放我的笔记，想法，一切我想分享的东西。`}</p>
      <div className="my-8">
        <div className="font-bold text-lg pb-4">📔 最近笔记</div>
        <BlogPosts />
        <div className="font-bold text-lg pb-2 pt-6">📋 最近想法</div>
        <Record />
      </div>
    </section>
  );
}
