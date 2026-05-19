"use client";
import { useTranslations } from "next-intl";
import {
  HiOutlineDocumentCheck,
  HiOutlineLanguage,
  HiOutlineTicket,
} from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";
import type { IconType } from "react-icons";
import { FaCarAlt, FaHotel } from "react-icons/fa";
import { motion } from "motion/react";

const serviceKeys = [
  "visa",
  "translation",
  "hotel",
  "ticket",
  "transfer",
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
} as const;

const serviceIcons: Record<(typeof serviceKeys)[number], IconType> = {
  visa: HiOutlineDocumentCheck,
  translation: HiOutlineLanguage,
  hotel: FaHotel,
  ticket: HiOutlineTicket,
  transfer: FaCarAlt,
};

function ServiceCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: IconType;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl shadow-card bg-white p-4 md:p-6 transition-all duration-300 ease-in-out cursor-pointer hover:translate-y-[-10px] hover:shadow-card-hover ">
      <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-[#5FCBB9]/15 text-[#2E9B8A]">
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="font-nexa text-2xl font-bold ">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{description}</p>
    </article>
  );
}

export default function Services() {
  const t = useTranslations("Services");

  return (
    <section
      id="solutions"
      className="scroll-mt-28 lg:scroll-mt-32 min-h-screen flex items-center py-5 lg:py-10"
    >
      <motion.div
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.2 }}
        className="container mx-auto px-5 lg:px-10 "
      >
        <SectionHeading
          label={t("label")}
          title={t("title")}
          description={t("description")}
          className="mx-auto text-left"
        />

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="mt-8 md:mt-12 lg:mt-16"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceKeys.slice(0, 3).map((key) => {
              const Icon = serviceIcons[key];
              return (
                <ServiceCard
                  key={key}
                  Icon={Icon}
                  title={t(`cards.${key}.title`)}
                  description={t(`cards.${key}.description`)}
                />
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mx-auto lg:max-w-[calc(66.666%+1.25rem)] lg:grid-cols-2">
            {serviceKeys.slice(3).map((key) => {
              const Icon = serviceIcons[key];
              return (
                <ServiceCard
                  key={key}
                  Icon={Icon}
                  title={t(`cards.${key}.title`)}
                  description={t(`cards.${key}.description`)}
                />
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
