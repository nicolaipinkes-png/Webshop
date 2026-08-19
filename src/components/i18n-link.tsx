"use client";

import NextLink, { type LinkProps } from "next/link";
import { forwardRef } from "react";
import { useLocale } from "@/lib/i18n/locale-context";

function localizePath(href: string, locale: string) {
  if (!href.startsWith("/")) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

type Props = Omit<LinkProps, "href"> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link({ href, ...props }, ref) {
  const locale = useLocale();
  return <NextLink ref={ref} href={localizePath(href, locale)} {...props} />;
});
