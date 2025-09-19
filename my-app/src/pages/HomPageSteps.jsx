import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
<Helmet>
  <title>Parenting Autism Together | Support for Indian Parents</title>
  <meta name="description" content="Explore resources, activities, and government schemes for autism parenting in India. Available in Marathi, Hindi, and English." />
  <meta name="keywords" content="Autism, Parenting, India, Activities, Government Schemes, Marathi, Hindi, English" />
  <link rel="canonical" href="https://parentingautismtogether.in/" />
</Helmet>
// Home page now fully internationalised: every user‑facing string is pulled from
// translation.json via i18next.  No extra UI libraries—still plain JSX + Tailwind.

function HomePage() {

   useEffect(() => {
    // Replace with your Render service URL
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
     fetch(`${baseUrl}/ping`)
      .then(() => console.log("Service warmed up"))
      .catch((err) => console.error("Ping failed:", err));
  }, []);
  
  const { t } = useTranslation();
  
  const navigate = useNavigate();  

  // Keys map to entries in translation.json → features.<key>.*
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
  }
  
];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("hero.heading")}</h1>
        {/* allow <1></1> tag for bold name via Trans component or dangerouslySetInnerHTML */}
        <p
          className="text-lg text-gray-700"
          dangerouslySetInnerHTML={{ __html: t("hero.intro") }}
        />
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
              onClick={() => navigate(feature.route)}
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {t("nav.learnMore") || "Learn More"}
            </button>
          </div>

          
        ))}
      </div>   
      <br></br>
      <section className="bg-blue-50 rounded-2xl shadow-md p-6 md:p-8 space-y-4">
        <h3 className="text-xl font-semibold">
          🧭 {t("findCenterHelpTitle")}
        </h3>
        <p className="text-gray-700">
          {t("findCenterHelpIntro")}
        </p>

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
