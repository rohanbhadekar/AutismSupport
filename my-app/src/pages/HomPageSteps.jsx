import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

function HomePage() {
  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    if (!baseUrl) return;
    fetch(`${baseUrl}/ping`)
      .then(() => console.log("Service warmed up"))
      .catch((err) => console.error("Ping failed:", err));
  }, []);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      key: "aboutAutism",
      emojiKey: "nav.aboutAutismEmoji",
      titleKey: "nav.aboutTitle",
      descKey: "nav.aboutDescription",
      route: "/about",
    },
    {
      key: "homeActivities",
      emojiKey: "nav.homeActivitiesEmoji",
      titleKey: "nav.homeActivitiesTitle",
      descKey: "nav.homeActivitiesDescription",
      route: "/home-activities",
    },
    {
      key: "socialStories",
      emojiKey: "nav.socialStoriesEmoji",
      titleKey: "nav.socialStoriesTitle",
      descKey: "nav.socialStoriesDescription",
      route: "/social-stories",
    },
    {
      key: "articles",
      emojiKey: "nav.articlesEmoji",
      titleKey: "nav.articlesTitle",
      descKey: "nav.articlesDescription",
      route: "/articles",
    },
    {
      key: "govtSchemes",
      emojiKey: "nav.govtSchemesEmoji",
      titleKey: "nav.govtSchemesTitle",
      descKey: "nav.govtSchemesDescription",
      route: "/govt-schemes",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Helmet>
        <title>Parenting Autism Together | Support for Indian Parents</title>
        <meta
          name="description"
          content="Explore resources, activities, and government schemes for autism parenting in India. Available in Marathi, Hindi, and English."
        />
        <meta
          name="keywords"
          content="Autism, Parenting, India, Activities, Government Schemes, Marathi, Hindi, English"
        />
        <link rel="canonical" href="https://parentingautismtogether.in/" />
      </Helmet>

      {/* Hero */}
<header className="text-center mb-8">
  <h1 className="text-3xl font-bold mb-2">{t("hero.heading")}</h1>
  <div className="text-gray-700 text-base leading-relaxed text-left max-w-5xl mx-auto">
    <ReactMarkdown
      components={{
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        ul: ({ children }) => <ul className="list-disc pl-6 space-y-1">{children}</ul>,
        li: ({ children }) => <li>{children}</li>,
        p: ({ children }) => <p className="mb-2">{children}</p>
      }}
    >
      {t("hero.intro")}
    </ReactMarkdown>
  </div>
</header>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div
            key={feature.key}
            className="border rounded-2xl p-5 shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              {t(feature.emojiKey)} {t(feature.titleKey)}
            </h2>
            <p className="text-gray-600 mb-4">{t(feature.descKey)}</p>

            <button
              type="button"
              onClick={() => navigate(feature.route)}
              className="group inline-flex items-center text-blue-600 font-medium"
            >
              <span>{t("nav.learnMore") || "Learn More"}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ))}
      </div>

      <section className="bg-blue-50 rounded-2xl shadow-md p-6 md:p-8 mt-8 space-y-4">
        <h3 className="text-xl font-semibold">🧭 {t("findCenterHelpTitle")}</h3>
        <p className="text-gray-700">{t("findCenterHelpIntro")}</p>

        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>{t("findCenterStep1")}</li>
          <li>{t("findCenterStep2")}</li>
          <li>{t("findCenterStep3")}</li>
        </ul>

        <p className="text-sm text-gray-600">
          🔗 {t("findCenterLinkText")}{" "}
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Google Maps
          </a>
        </p>
      </section>
    </div>
  );
}

export default HomePage;
