"use client";
import { useTranslations } from "next-intl";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion } from "motion/react";

const whyKeys = [
  "builtForTravel",
  "integrations",
  "scalable",
  "support",
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
} as const;

export default function Why() {
  const t = useTranslations("Why");

  return (
    <section
      id="why"
      className="scroll-mt-28 py-12 sm:py-16 lg:scroll-mt-32 lg:py-24"
    >
      <motion.div
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.2 }}
        className="container mx-auto px-5 lg:px-10"
      >
        <SectionHeading label={t("label")} title={t("title")} />

        <div className="mt-12 grid grid-cols-1 gap-5 auto-rows-fr md:grid-cols-2 lg:mt-16 lg:gap-6">
          {whyKeys.map((key, index) => (
            <motion.article
              key={key}
              {...fadeUp}
              transition={{
                ...fadeUp.transition,
                delay: 0.1 * index,
              }}
              className="why-card p-px bg-[#E5EAF0] transition-all duration-300 ease-in-out cursor-pointer lg:hover:translate-y-[-10px] "
            >
              <div className="bg-white why-card h-full p-6 sm:p-8">
                <h3 className="font-nexa text-lg font-bold text-[#1a1a1a] sm:text-xl">
                  {t(`cards.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6b6b6b] sm:text-[15px] sm:leading-7">
                  {t(`cards.${key}.description`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
