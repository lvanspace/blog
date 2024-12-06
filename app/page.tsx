import { BlogPosts } from 'app/components/posts'

import Record from './components/record'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        你好，来到 李宇 Blog。
      </h1>
      <p className="mb-4">
        {`这里存放我的笔记，想法，一切我想分享的东西。`}
      </p>
      <div className="my-8">
        <BlogPosts />

        <Record />
      </div>
    </section>
  )
}
