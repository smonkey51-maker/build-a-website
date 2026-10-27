import { SiteHeader } from "@/components/site-header";
import { type Locale, getDictionary, isLocale } from "@/lib/i18n";
import { posts } from "@content/index.js";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts
    .filter((post) => !post.draft)
    .map((post) => ({ locale: post.locale, slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = posts.find(
    (p) => p.slug === slug && p.locale === locale && !p.draft,
  );
  if (!post) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <SiteHeader locale={locale as Locale} dict={dict} />
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 pb-24">
        <Link href={`/${locale}/blog`} className="text-sm underline">
          {dict.blog.back}
        </Link>
        <article className="flex flex-col gap-6">
          <header className="flex flex-col gap-3">
            <time
              className="text-xs text-muted-foreground"
              dateTime={post.publishedAt}
            >
              {post.publishedAt}
            </time>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground">{post.description}</p>
          </header>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: HTML generato da Velite dai file MDX del repo, non da input utente */}
          <div
            className="prose flex flex-col gap-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
      </main>
    </>
  );
}
