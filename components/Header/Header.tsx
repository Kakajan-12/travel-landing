"use client";

import Image from "next/image";
import { useTranslations, useLocale, useMessages } from "next-intl";
import { Link, usePathname } from "@/app/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { routing } from "@/app/i18n/routing";
import { HiChevronRight } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiXMark } from "react-icons/hi2";

const NAV_SECTIONS: Record<string, string> = {
  about: "hero",
  solutions: "solutions",
  benefits: "benefits",
  why: "why",
};

function getSectionId(navKey: string) {
  return NAV_SECTIONS[navKey] ?? navKey;
}

export default function Header() {
  const t = useTranslations("Header");
  const messages = useMessages() as {
    Header?: { nav?: Record<string, string> };
  };
  const navKeys = Object.keys(messages.Header?.nav ?? {});
  const locale = useLocale();
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const scrollToId = (id: string, behavior: ScrollBehavior = "smooth") => {
    document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  };

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash;
      setHash(h);
      const id = h.slice(1);
      if (id) requestAnimationFrame(() => scrollToId(id, "auto"));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setHash(window.location.hash);
    });
    return () => cancelAnimationFrame(id);
  }, [locale]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const close = (e: PointerEvent) => {
      if (!langRef.current?.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileLangOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const localeSwitchHref = pathname || "/";
  const isActive = (navKey: string) => {
    const id = getSectionId(navKey);
    if (id === "hero") return !hash || hash === "#hero";
    return hash === `#${id}`;
  };

  const scrollToSection = (navKey: string) => {
    const id = getSectionId(navKey);
    const nextHash = `#${id}`;
    closeMenu();
    setHash(nextHash);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${nextHash}`,
    );
    requestAnimationFrame(() => scrollToId(id));
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileLangOpen(false);
  };

  const scrollToHomeTop = () => {
    closeMenu();
    setHash("");
    const { pathname: path, search } = window.location;
    window.history.replaceState(null, "", path + search);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#C4C4C4] bg-[#D9D9D933] backdrop-blur-md">
        <div className="container relative mx-auto flex items-center justify-between gap-4 px-5 py-2 lg:px-10">
          <Link
            href="/"
            scroll={false}
            className="flex shrink-0 items-center"
            onClick={scrollToHomeTop}
          >
            <Image
              src="/logo.svg"
              alt={t("brand")}
              width={155}
              height={50}
              className="h-9 w-auto sm:h-16"
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-10 lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2"
            aria-label="Main"
          >
            {navKeys.map((key) => (
              <Link
                key={key}
                href={`#${getSectionId(key)}`}
                scroll={false}
                className={`text-[15px] font-bold transition-colors ${
                  isActive(key)
                    ? "text-[#2E6BFF]"
                    : "text-[#1a1a1a] hover:text-[#2E6BFF]"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(key);
                }}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <div ref={langRef} className="relative hidden lg:block">
              <button
                type="button"
                className="inline-flex items-center justify-between gap-1 px-3 py-2 text-md font-medium underline transition-colors"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label={t("language")}
                onClick={() => setLangOpen((o) => !o)}
              >
                {t(`langNames.${locale}`)}
              </button>
              {langOpen ? (
                <ul
                  className="absolute right-0 top-full z-50 mt-1.5 min-w-full rounded-md border border-neutral-200 bg-white px-3 shadow-lg"
                  role="listbox"
                  aria-label={t("language")}
                >
                  {routing.locales
                    .filter((l) => l !== locale)
                    .map((l, i) => (
                      <li
                        key={l}
                        role="option"
                        aria-selected={false}
                        className={
                          i > 0 ? "border-t border-black/40" : undefined
                        }
                      >
                        <Link
                          href={localeSwitchHref}
                          locale={l}
                          scroll={false}
                          className="block py-2 text-center text-sm font-bold text-[#1a1a1a] transition-colors hover:bg-neutral-50 hover:text-[#2E6BFF]"
                          onClick={() => setLangOpen(false)}
                        >
                          {t(`langNames.${l}`)}
                        </Link>
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>

            <Link
              href="#"
              scroll={false}
              className="hidden w-32 items-center justify-center rounded-md bg-linear-to-r from-[#5FCBB9] to-[#2E6BFF] py-2 text-base font-bold text-white transition-opacity hover:opacity-90 sm:inline-flex"
              onClick={closeMenu}
            >
              {t("started")}
            </Link>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-md text-[#1a1a1a] lg:hidden"
              aria-expanded={menuOpen}
              aria-label={t("openMenu")}
              onClick={() => {
                setLangOpen(false);
                setMenuOpen(true);
              }}
            >
              <RxHamburgerMenu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-60 flex flex-col bg-white h-screen w-[80vw] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <div className="flex shrink-0 items-center justify-between px-5 py-4">
            <Link
              href="/"
              scroll={false}
              className="flex shrink-0 items-center"
              onClick={scrollToHomeTop}
            >
              <Image
                src="/logo.svg"
                alt={t("brand")}
                width={158}
                height={56}
                className="h-15 w-auto sm:h-16"
                priority
              />
            </Link>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-end text-black"
              aria-label={t("closeMenu")}
              onClick={closeMenu}
            >
              <HiXMark className="size-6" aria-hidden />
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col overflow-y-auto px-6 pb-10 pt-6 text-lg"
            aria-label="Main mobile"
          >
            <ul className="flex flex-col gap-10">
              {navKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={`#${getSectionId(key)}`}
                    scroll={false}
                    className="text-lg leading-none font-bold text-black underline decoration-1 underline-offset-[10px] transition-opacity hover:opacity-70"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(key);
                    }}
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-lg leading-none font-bold text-black underline decoration-1 underline-offset-[10px] transition-opacity hover:opacity-70"
                  aria-expanded={mobileLangOpen}
                  aria-label={t("language")}
                  onClick={() => setMobileLangOpen((o) => !o)}
                >
                  {t(`langNames.${locale}`)}
                  <HiChevronRight
                    className={`size-5 shrink-0 transition-transform duration-200 ${
                      mobileLangOpen ? "rotate-90" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {mobileLangOpen ? (
                  <ul className="mt-6 flex flex-col gap-5">
                    {routing.locales
                      .filter((l) => l !== locale)
                      .map((l) => (
                        <li key={l}>
                          <Link
                            href={localeSwitchHref}
                            locale={l}
                            scroll={false}
                            className="text-lg leading-none font-bold text-black underline decoration-1 underline-offset-[10px] transition-opacity hover:opacity-70"
                            onClick={closeMenu}
                          >
                            {t(`langNames.${l}`)}
                          </Link>
                        </li>
                      ))}
                  </ul>
                ) : null}
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
