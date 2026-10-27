import { Button } from "@/components/ui/button";
import { type Locale, getDictionary, isLocale } from "@/lib/i18n";
import { posts } from "@content/index.js";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const latest = posts
    .filter((post) => post.locale === locale && !post.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-24">
      <nav
        aria-label="Principale"
        className="flex items-center justify-between"
      >
        <span className="font-semibold">{dict.meta.title}</span>
        <ul className="flex gap-6 text-sm">
          <li>
            <Link href={`/${locale}`}>{dict.nav.home}</Link>
          </li>
          <li>
            <Link href={`/${locale}/blog`}>{dict.nav.blog}</Link>
          </li>
          <li>
            <Link href={`/${locale}#contatti`}>{dict.nav.contact}</Link>
          </li>
        </ul>
      </nav>

      <section className="flex flex-col gap-6">
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
  );
}
