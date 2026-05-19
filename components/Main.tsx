import { HiArrowRight } from "react-icons/hi";
import { useTranslations } from "next-intl";
import mainBg from "@/public/mainBg.svg";
import { CSSProperties } from "react";
import pc from "@/public/pc.png";
import Image from "next/image";

export default function Main() {
  const t = useTranslations("Main");
  return (
    <section id="hero" className="relative">
      <div
        className="main-bg-pattern absolute inset-0 z-0"
        style={
          {
            "--main-bg-url": `url(${mainBg.src})`,
          } as CSSProperties
        }
        aria-hidden
      />
      <div className="container relative mx-auto px-5 lg:px-10 py-8 min-h-[85vh] md:min-h-[70vh] lg:min-h-[85vh] flex flex-col md:flex-row items-start sm:items-center justify-center gap-4 lg:gap-8">
        <div className="description-container w-full md:w-2/3 space-y-5">
          <h1 className="font-nexa text-2xl lg:text-5xl font-bold">
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="whitespace-nowrap bg-linear-to-r from-[#5FCBB9] to-[#2E6BFF] bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className="text-sm lg:text-2xl leading-relaxed pb-2 lg:pb-10">
            {t("description")}
          </p>
          <a
            href="#"
            className="btn-shine inline-flex w-[212px] py-4 items-center justify-center gap-2.5 rounded-md bg-linear-to-r from-[#5FCBB9] to-[#2E6BFF] px-12 text-sm font-bold tracking-wide whitespace-nowrap text-white shadow-lg transition-opacity hover:opacity-90"
          >
            {t("getDemo")}
            <HiArrowRight className="size-5 shrink-0" aria-hidden />
          </a>
        </div>
        <div
          className="w-full md:w-1/3 md:mx-10 aspect-video scale-90 sm:scale-80 md:scale-150 2xl:scale-170"
          role="img"
          aria-label="CRM dashboard preview"
        >
          <Image
            src={pc}
            loading="eager"
            alt="PC"
            width={pc.width}
            height={pc.height}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
