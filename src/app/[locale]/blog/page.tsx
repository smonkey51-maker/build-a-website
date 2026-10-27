import { SiteHeader } from "@/components/site-header";
import { type Locale, getDictionary, isLocale } from "@/lib/i18n";
import { posts } from "@content/index.js";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const list = posts
    .filter((post) => post.locale === locale && !post.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <>
      <SiteHeader locale={locale as Locale} dict={dict} />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 pb-24">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {dict.blog.all}
        </h1>
        {list.length === 0 ? (
          <p className="text-muted-foreground">{dict.blog.empty}</p>
        ) : (
          <ul className="flex flex-col gap-8">
            {list.map((post) => (
              <li key={post.permalink} className="flex flex-col gap-2">
                <time
                  className="text-xs text-muted-foreground"
                  dateTime={post.publishedAt}
                >
                  {post.publishedAt}
                </time>
                <Link
                  href={post.permalink}
                  className="text-xl font-medium hover:underline"
                >
                  {post.title}
                </Link>
                <p className="text-muted-foreground">{post.description}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
