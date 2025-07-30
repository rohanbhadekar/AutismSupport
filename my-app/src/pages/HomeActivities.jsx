import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
<Helmet>
  <title>Parenting Autism Together | Support for Indian Parents</title>
  <meta name="description" content="Explore resources, activities, and government schemes for autism parenting in India. Available in Marathi, Hindi, and English." />
  <meta name="keywords" content="Autism, Parenting, India, Activities, Government Schemes, Marathi, Hindi, English" />
  <link rel="canonical" href="https://parentingautismtogether.in/" />
</Helmet>

const HomeActivities = () => {


  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  const [activities, setActivities] = useState([]);

  useEffect(() => {
     const baseUrl = process.env.REACT_APP_API_BASE_URL;
     console.log("Fetching activities from:", `${baseUrl}activities?lang=${lang}`);
    fetch(`${baseUrl}/activities?lang=${lang}`)
      .then((res) => res.json())
      .then((data) =>  setActivities(data))
      .catch((err) => console.error("API error:", err));
  }, [lang]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🏠 {t("Home-Activities.heading")}</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

const ActivityCard = ({ activity }) => {
   const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const {
    title,
    overview,
    age_min,
    age_max,
    time_min,
    time_max,
    skills,
    materials,
    steps,
    safety_note,
  } = activity;

  return (
    <div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-4 transition hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-2">🎯 {title}</h2>

      <div className="text-sm text-gray-600 space-y-1">
        <p>🕒 {t("Home-Activities.duration")}: {time_min}–{time_max} {t("Home-Activities.mins")}</p>
        <p>👶 {t("Home-Activities.age")}: {age_min}–{age_max} {t("Home-Activities.yrs")}</p>
        <p>📌 {t("Home-Activities.overview")}: {overview}</p>
        <p>🛠 {t("Home-Activities.materials")}: {materials?.length || 0}</p>
        <p>🧠 {t("Home-Activities.skills")}: {skills?.length || 0}</p>
      </div>

      <button
        className="mt-3 text-sm text-blue-600 hover:underline"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? `▲ ${t("Home-Activities.hideDetails")}` : `▼ ${t("Home-Activities.showDetails")}`}
      </button>

      {showMore && (
        <div className="mt-3 text-sm text-gray-700 space-y-2">
          {steps?.benefits?.length > 0 && (
            <div>
              <strong>✅ {t("Home-Activities.benefits")}</strong>
              <ul className="list-disc pl-5">
                {steps.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}
          {steps?.steps?.length > 0 && (
            <div>
              <strong>📋 {t("Home-Activities.steps")}:</strong>
              <ol className="list-decimal pl-5">
                {steps.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          )}
          {steps?.tips?.length > 0 && (
            <div>
              <strong>💡 {t("Home-Activities.tips")}:</strong>
              <ul className="list-disc pl-5">
                {steps.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}
          {materials?.length > 0 && (
            <div>
              <strong>🧰 {t("Home-Activities.materials")}:</strong> {materials.join(", ")}
            </div>
          )}
          {skills?.length > 0 && (
            <div>
              <strong>🧠 {t("Home-Activities.skills")}:</strong> {skills.join(", ")}
            </div>
          )}
          {safety_note && (
            <div className="text-red-600">
              <strong>⚠️ {t("Home-Activities.safety")}:</strong> {safety_note}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeActivities;
