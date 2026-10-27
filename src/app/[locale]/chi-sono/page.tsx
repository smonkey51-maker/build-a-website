import { SiteHeader } from "@/components/site-header";
import { type Locale, getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <SiteHeader locale={locale as Locale} dict={dict} />
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 pb-24">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {dict.about.heading}
        </h1>
        {dict.about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
      </main>
    </>
  );
}
