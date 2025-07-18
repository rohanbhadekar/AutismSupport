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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Step Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 transition hover:shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">
            {current.title}
          </h2>
          <div className="text-sm text-gray-500">
            {t("step")} {step + 1} / {steps.length}
          </div>
        </div>

        {current.text && !current.text.includes("http") ? (
          <p className="text-gray-800 text-base leading-relaxed mb-4 prose max-w-none">
            {current.text}
          </p>
        ) : (
          <div
            className="mb-4 text-gray-800 text-base leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: current.text || "" }}
          />
        )}

        {current.points && (
          <ul className="list-disc pl-6 space-y-2 text-gray-800 text-base">
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
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50"
          >
            ⬅ {t("back") || "Back"}
          </button>
          <button
            onClick={next}
            disabled={step === steps.length - 1}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            {t("next") || "Next"} ➡
          </button>
        </div>
      </div>

      {/* Glossary Terms Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6">
          🧠 {t("terms")}
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {terms.map((term, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl bg-gray-50 p-4 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-blue-700 mb-2">
                {term.title}
              </h3>
              <p className="text-gray-800 text-sm mb-2">{term.text}</p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>{t("WhyMatters")}: </strong>
                {term["Why it matters"]}
              </p>
              <p className="text-sm text-gray-700">
                <strong>{t("Example")}: </strong>
                {term["Example"]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
