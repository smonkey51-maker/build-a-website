import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

export function SiteHeader({
  locale,
  dict,
}: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-6">
      <Link href={`/${locale}`} className="font-semibold">
        {dict.meta.title}
      </Link>
      <nav aria-label="Principale">
        <ul className="flex flex-wrap gap-4 text-sm">
          <li>
            <Link href={`/${locale}/blog`}>{dict.nav.blog}</Link>
          </li>
          <li>
            <Link href={`/${locale}#progetti`}>{dict.nav.portfolio}</Link>
          </li>
          <li>
            <Link href={`/${locale}#guide`}>{dict.nav.books}</Link>
          </li>
          <li>
            <Link href={`/${locale}/chi-sono`}>{dict.nav.about}</Link>
          </li>
          <li>
            <Link href={`/${locale}#contatti`}>{dict.nav.contact}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
