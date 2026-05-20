"use client";

import { useTranslations } from "next-intl";
import { HiArrowRight } from "react-icons/hi";
import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
} as const;

export default function CtaBanner() {
  const t = useTranslations("Cta");

  return (
    <section className="py-8">
      <div className="container mx-auto px-5 lg:px-10">
        <motion.div
          {...fadeUp}
          className="cta-banner flex flex-col items-start"
          data-header-theme="dark"
        >
          <h2 className="max-w-2xl font-nexa text-2xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base sm:leading-7">
            {t("description")}
          </p>
          <a
            href="#"
            className="btn-shine mt-8 inline-flex items-center justify-center gap-2.5 rounded-md bg-linear-to-r from-[#5FCBB9] to-[#2E6BFF] px-8 py-3 text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-90 sm:mt-10 sm:px-10 sm:text-base"
          >
            {t("button")}
            <HiArrowRight className="size-5 shrink-0" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
