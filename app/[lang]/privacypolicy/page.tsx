import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
interface PrivacySection {
  title: string;
  content: React.ReactNode;
}

const PrivacyPolicyPage: React.FC = () => {
  const t = useTranslations("PrivacyPolicy");
  const sections: PrivacySection[] = [
    {
      title: t("title2"),
      content: (
        <div className="space-y-4">
          <p>{t("description2")}</p>
          <div>
            <h4 className="font-bold ">{t("items1.0.title")}</h4>
            <p>{t("items1.0.description")}</p>
          </div>
          <div>
            <h4 className="font-bold ">{t("items1.1.title")}</h4>
            <p>{t("items1.1.description")}</p>
          </div>
          <div>
            <h4 className="font-bold">{t("items1.2.title")}</h4>
            <p>{t("items1.2.description")}</p>
          </div>
        </div>
      ),
    },
    {
      title: t("title3"),
      content: (
        <div className="space-y-4">
          <p>{t("description3")}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>{t("items2.0.description")}</li>
            <li>{t("items2.1.description")}</li>
            <li>{t("items2.2.description")}</li>
            <li>{t("items2.3.description")}</li>
            <li>{t("items2.4.description")}</li>
          </ul>
          <p className="font-medium mt-4">{t("span")}</p>
        </div>
      ),
    },
  ];

  return (
    <section className="min-h-screen container mx-auto py-5 md:py-10 px-5 lg:px-10 flex flex-col gap-4 lg:gap-8 text-black">
      <div className="mx-auto flex flex-col flex-wrap">
        {/* Заголовок */}
        <h2 className="font-nexa text-2xl md:text-6xl font-bold tracking-tight mb-6 lg:mb-12">
          {t("title1")}
        </h2>

        {/* Вступление */}
        <p className="mb-6 lg:mb-16 text-sm lg:text-xl font-nexa leading-relaxed">
          {t("description1")}
          <Link
            href="https://hebent.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-gray-500 transition-colors"
          >
            {" "}
            hebent.tech{" "}
          </Link>
          {t("description1_2")}
        </p>

        {/* Секции */}
        <div className="space-y-6 lg:space-y-10">
          {sections.map((section, index) => (
            <section key={index} className="font-nexa text-sm lg:text-xl pt-4">
              <h3 className="text-xl lg:text-3xl font-bold mb-6">
                {index + 1}. {section.title}
              </h3>
              <div className="leading-relaxed text-sm lg:text-xl">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
