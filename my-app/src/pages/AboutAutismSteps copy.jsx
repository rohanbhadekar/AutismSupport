import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AboutAutism() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  const steps = t("aboutAutismSteps", { returnObjects: true });
  const terms = t("AutismTerms", { returnObjects: true });

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const current = steps[step];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">{current.title}</h2>

        {current.text && !current.text.includes("http") ? (
          <p className="text-gray-800 mb-4">{current.text}</p>
        ) : (
          <p
            className="mb-4 text-gray-800"
            dangerouslySetInnerHTML={{ __html: current.text || "" }}
          ></p>
        )}

        {current.points && (
          <ul className="list-disc pl-6 space-y-1 text-gray-800">
            {current.points.map((point, idx) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{ __html: point }}
              ></li>
            ))}
          </ul>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={back}
            disabled={step === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            ⬅ {t("back") || "Back"}
          </button>
          <button
            onClick={next}
            disabled={step === steps.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {t("next") || "Next"} ➡
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md mt-10 p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">🧠 {t("terms")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {terms.map((term, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {term.title}
              </h3>
              <p className="text-sm text-gray-800 mb-2">{term.text}</p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>{t("WhyMatters")}</strong> {term["Why it matters"]}
              </p>
              <p className="text-sm text-gray-700">
                <strong>{t("Example")}</strong> {term["Example"]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
