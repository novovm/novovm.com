import Image from "next/image";

import { getSiteContent, type Language } from "@/lib/site-content";

type FooterProps = {
  language: Language;
};

export function Footer({ language }: FooterProps) {
  const copy = getSiteContent(language);

  return (
    <footer className="border-t border-border bg-background px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-4 font-semibold text-text">
            <Image
              alt=""
              className="h-11 w-auto object-contain"
              height={231}
              src="/logo.svg"
              width={384}
            />
            <Image
              alt="NOVOVM"
              className="h-5 w-auto object-contain"
              height={91}
              src="/wordmark.svg"
              width={724}
            />
          </div>
          <p className="mt-3 max-w-md leading-6">
            {copy.footer.description}
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-3">
          {copy.navItems.map((item) => (
            <a
              className="transition-colors duration-200 hover:text-text"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
