import { defineCollection, defineConfig, s } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.slug("post"),
      title: s.string().max(120),
      description: s.string().max(280),
      locale: s.enum(["it", "en"]),
      publishedAt: s.isodate(),
      draft: s.boolean().default(false),
      body: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/${data.locale}/blog/${data.slug}`,
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
});
