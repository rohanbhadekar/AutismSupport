import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { splitPreservingLinks } from "../utils/textUtils";
import { Helmet } from "react-helmet";
<Helmet>
  <title>Parenting Autism Together | Support for Indian Parents</title>
  <meta name="description" content="Explore resources, activities, and government schemes for autism parenting in India. Available in Marathi, Hindi, and English." />
  <meta name="keywords" content="Autism, Parenting, India, Activities, Government Schemes, Marathi, Hindi, English" />
  <link rel="canonical" href="https://parentingautismtogether.in/" />
</Helmet>
export default function GovtSchemes() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  const [schemes, setSchemes] = useState([]);
  const [showUDID, setShowUDID] = useState(true);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    console.log("Fetching government schemes from:", `${baseUrl}government-schemes?lang=${lang}`);
    fetch(`${baseUrl}/government-schemes?lang=${lang}`)
      .then((res) => res.json())
      .then(setSchemes)
      .catch(console.error);
  }, [lang]);

  const udid = t("udidGuide", { returnObjects: true });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ✅ UDID Section (Collapsible) */}
      <section className="bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-2xl border border-blue-200 p-6 mb-10 transition-all">
        <button
          onClick={() => setShowUDID(!showUDID)}
          className="w-full flex justify-between items-center text-left text-xl font-bold text-blue-800 hover:text-blue-900 transition-colors"
        >
          <span>{udid.title}</span>
          <span className="text-2xl">{showUDID ? "−" : "+"}</span>
        </button>

        {showUDID && (
          <div className="mt-5 space-y-6 text-gray-800 transition-all">
            <p className="text-base">{udid.whatIs}</p>

            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                ✅ {t("Benefits")}
              </h3>
              <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700">
                {udid.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                📌 {t("Eligibility")}
              </h3>
              <p>{udid.eligibility}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                📝 {t("How to Apply")}
              </h3>
              <ol className="list-decimal list-inside pl-4 space-y-1">
                {udid.howToApply.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </section>

      {/* ✅ Government Schemes Section */}
      <section>
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          🏛️ {t("Government Schemes")}
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {Array.isArray(schemes) &&
            schemes.map((s, idx) => (
              <div
                key={idx}
                className="bg-white border rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {s.Name}
                </h3>
                <p className="text-gray-800 mb-2">
                  <strong>{t("Overview")}:</strong> {s.Overview}
                </p>
                <p className="text-gray-800 mb-2">
                  <strong>{t("Benefits")}:</strong> {s.Benefits}
                </p>
                <p className="text-gray-800 mb-2">
                  <strong>{t("Eligibility")}:</strong> {s.Eligibility}
                </p>
                <p className="text-gray-800 mb-1">
                  <strong>{t("How to Apply")}:</strong>
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-2">
                  {splitPreservingLinks(s.HowToAvail).map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
