import { CustomMDX } from "app/components/mdx";
import { getBlogPosts } from "app/blog/utils";
export default function Record() {
  let post = getBlogPosts().find((post) => post.slug === "idea");
  return (
    <article className="prose">
      <CustomMDX source={post?.content} />
    </article>
  );
}
