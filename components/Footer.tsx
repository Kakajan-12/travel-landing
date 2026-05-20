import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import logo from "@/public/logo.svg";
import logoBg from "@/public/logo-bg.svg";
import Link from "next/link";
import logoFoot from "@/public/logoIcon.svg";
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { IoMail } from "react-icons/io5";
import footerBg from "@/public/mainBg.svg";
import { CSSProperties } from "react";

export default function Footer() {
  const t = useTranslations("Footer");
  const lang = useLocale();
  return (
    <footer
      id="contacts"
      className="relative isolate mt-20 md:mt-40 overflow-hidden scroll-mt-32 md:scroll-mt-36 text-white bg-white border-t border-[#C4C4C4]"
    >
      <div
        className="absolute inset-0 bg-linear-to-r from-[#5FCBB9] to-[#2E6BFF]"
        aria-hidden
      />
      <div
        className="footer-bg-pattern"
        style={
          {
            "--footer-bg-url": `url(${footerBg.src})`,
          } as CSSProperties
        }
        aria-hidden
      />
      {/* <div className="absolute -bottom-25 md:-bottom-20 right-[-100px] md:right-0">
        <Image
          src={logoBg}
          alt="logoBg"
          width={100}
          height={100}
          className="w-full h-full scale-50 md:scale-150 lg:scale-100"
        />
      </div> */}
      <div className="relative z-10 container mx-auto px-5 lg:px-10 py-6 lg:py-10 mb-15 md:mb-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-start">
          <div className="logo flex flex-col gap-3">
            <div className="flex items-center">
              <Image
                src={logo}
                alt={"logo"}
                width={155}
                height={50}
                className="h-18 w-auto brightness-0 invert"
              />
            </div>
            <p className="max-w-2xs text-xs leading-relaxed  sm:text-sm">
              {t("tagline")}
            </p>
          </div>
          <div className="contacts font-bold flex flex-col gap-3 md:gap-6">
            <h3 className="text-sm md:text-base tracking-wide underline">
              {t("contactsTitle")}
            </h3>
            <ul className="flex flex-col gap-2 md:gap-3 text-sm md:text-base font-medium">
              <li className="inline-flex items-start gap-3">
                <HiLocationMarker
                  className="size-4 shrink-0 mt-1"
                  aria-hidden
                />
                <span className="">
                  {t.rich("address", { br: () => <br /> })}
                </span>
              </li>
              <li>
                <a
                  href={`tel:+993 71 397778`}
                  className="inline-flex items-start gap-3 transition-opacity hover:opacity-90"
                >
                  <BsFillTelephoneFill
                    className="size-4 shrink-0 mt-1"
                    aria-hidden
                  />
                  <span className="tabular-nums leading-none mt-1">
                    +993 71 397778
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:info@hebent.tech`}
                  className="inline-flex items-start gap-3 leading-nonetransition-opacity hover:opacity-90"
                >
                  <IoMail className="size-4 shrink-0 mt-1" aria-hidden />
                  <span className="leading-none mt-1">info@hebent.tech</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 font-nexa font-medium text-[8px] lg:text-base">
        {/* <div className="container mx-auto py-3 px-5 lg:px-10 flex items-center gap-2">
          <span className="leading-none pt-1">{year}</span>
          <p className="flex items-center gap-1">
            <Image
              src={logo}
              alt="logo"
              width={25}
              height={25}
              className="w-6 h-6"
            />
            <span className="pt-1">Hebent Technology</span>
          </p>
          <span className="leading-none pt-1">{t("copyright")}</span>
        </div> */}
        <div className="w-full flex flex-wrap items-center justify-center gap-1 py-5">
          <span className="whitespace-nowrap">{t("rights")} | </span>
          <Link
            href={`/${lang}/privacypolicy`}
            className="underline-offset-2 hover:underline whitespace-nowrap"
          >
            {t("privacy")} |
          </Link>
          <Link
            href={`/${lang}/cookies`}
            className="underline-offset-2 hover:underline whitespace-nowrap"
          >
            Cookies |
          </Link>
          <span className="whitespace-nowrap"> Powered by </span>
          <div className="flex items-center gap-1">
            <Image
              src={logoFoot}
              alt="HEBENT TECHNOLOGY"
              width={29}
              height={31}
              className="inline-block w-6 h-auto logo-spin motion-reduce:animate-none mb-1 brightness-0 invert"
            />
            <span className="uppercase text-xs leading-none">
              Hebent Technology
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
