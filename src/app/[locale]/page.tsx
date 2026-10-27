import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { type Locale, getDictionary, isLocale } from "@/lib/i18n";
import { posts } from "@content/index.js";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const latest = posts
    .filter((post) => post.locale === locale && !post.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <>
      <SiteHeader locale={locale as Locale} dict={dict} />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-20 px-6 pb-24">
        <section className="flex flex-col gap-6 pt-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {dict.hero.subtitle}
          </p>
          <div>
            <Button asChild size="lg">
              <Link href={`/${locale}/blog`}>{dict.hero.cta}</Link>
            </Button>
          </div>
        </section>

        <section aria-labelledby="blog-heading" className="flex flex-col gap-6">
          <h2 id="blog-heading" className="text-2xl font-semibold">
            {dict.blog.heading}
          </h2>
          {latest.length === 0 ? (
            <p className="text-muted-foreground">{dict.blog.empty}</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {latest.map((post) => (
                <li key={post.permalink} className="flex flex-col gap-1">
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
          <div>
            <Link href={`/${locale}/blog`} className="text-sm underline">
              {dict.blog.all}
            </Link>
          </div>
        </section>

        <section
          id="guide"
          aria-labelledby="books-heading"
          className="flex flex-col gap-6"
        >
          <h2 id="books-heading" className="text-2xl font-semibold">
            {dict.books.heading}
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {dict.books.items.map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-input p-6"
              >
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.subtitle}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="progetti"
          aria-labelledby="portfolio-heading"
          className="flex flex-col gap-6"
        >
          <h2 id="portfolio-heading" className="text-2xl font-semibold">
            {dict.portfolio.heading}
          </h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {dict.portfolio.items.map((item) => (
              <li
                key={item.title}
                className="rounded-lg border border-input p-6"
              >
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="contatti"
          aria-labelledby="newsletter-heading"
          className="flex flex-col gap-4"
        >
          <h2 id="newsletter-heading" className="text-2xl font-semibold">
            {dict.newsletter.heading}
          </h2>
          <form
            action="/api/newsletter"
            method="post"
            className="flex flex-col gap-3 md:flex-row"
          >
            <label className="sr-only" htmlFor="email">
              {dict.newsletter.placeholder}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={dict.newsletter.placeholder}
              className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm"
            />
            <Button type="submit">{dict.newsletter.submit}</Button>
          </form>
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input type="checkbox" name="consent" required className="mt-1" />
            <span>{dict.newsletter.consent}</span>
          </label>
        </section>
      </main>
    </>
  );
}
