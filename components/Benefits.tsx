"use client";
import { useTranslations } from "next-intl";
import {
  HiOutlineArrowPath,
  HiOutlineBolt,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";
import type { IconType } from "react-icons";
import { MdOutlineSpatialTracking } from "react-icons/md";
import { TbCloudLock } from "react-icons/tb";
import { motion } from "motion/react";

const benefitKeys = [
  "automation",
  "clients",
  "booking",
  "tracking",
  "secure",
] as const;

const benefitIcons: Record<(typeof benefitKeys)[number], IconType> = {
  automation: HiOutlineArrowPath,
  clients: HiOutlineUserGroup,
  booking: HiOutlineBolt,
  tracking: MdOutlineSpatialTracking,
  secure: TbCloudLock,
};

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
} as const;

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -150, y: 50 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.45 },
  },
};

export default function Benefits() {
  const t = useTranslations("Benefits");

  return (
    <section
      id="benefits"
      className="scroll-mt-28 py-12 sm:py-16 lg:scroll-mt-32 lg:py-24"
    >
      <motion.div {...fadeUp} className="container mx-auto px-5 lg:px-10">
        <SectionHeading
          label={t("label")}
          title={t.rich("title", {
            br: () => <br />,
          })}
        />

        <motion.ul
          className="mt-12 flex flex-col gap-4 lg:mt-16 lg:gap-5"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {benefitKeys.map((key) => {
            const Icon = benefitIcons[key];
            return (
              <motion.li key={key} variants={itemVariants}>
                <article className="flex gap-4 rounded-2xl shadow-card bg-white p-4 sm:gap-5 sm:p-5 lg:p-6 cursor-pointer hover:translate-y-[-10px] hover:shadow-card-hover transition-all duration-300 ease-in-out">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#5FCBB9]/15 text-[#2E9B8A] sm:size-14">
                    <Icon className="size-6 sm:size-7" aria-hidden />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-nexa text-base font-bold md:text-2xl">
                      {t(`items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed sm:mt-2 md:text-base">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}
