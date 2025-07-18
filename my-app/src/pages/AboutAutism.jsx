import React from "react";
import { useTranslation } from "react-i18next";

// Import your local images (place them in /src/assets or /public/images)


const AboutAutism = () => {
  const { t } = useTranslation();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🌈 {t("aboutAutismTitle")}</h1>

      {/* What is Autism */}
      <section className="mb-8">
       
        <p className="mb-4 text-lg text-justify">🧠{t("whatIsAutism")}</p>
        <ul className="list-disc list-inside space-y-1">
          <li>{t("autismNotDisease")}</li>
          <li>{t("autismBehavior")}</li>
          <li>{t("earlySupport")}</li>
        </ul>
      </section>

      {/* Common Signs */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🧩 {t("commonSigns")}</h2>

        {/* Social & Communication */}
        <div className="flex items-start mb-6">
          <div>
            <h3 className="text-xl font-medium mb-2">👁️{t("socialCommunication")}</h3>
            <ul className="list-disc list-inside space-y-1">
              {t("socialPoints", { returnObjects: true }).map((item, idx) => (
                <li key={`social-${idx}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Repetitive Behavior */}
        <div className="flex items-start mb-6">
      
          <div>
            <h3 className="text-xl font-medium mb-2">🔄 {t("repetitiveBehavior")}</h3>
            <ul className="list-disc list-inside space-y-1">
              {t("repetitivePoints", { returnObjects: true }).map((item, idx) => (
                <li key={`repetitive-${idx}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sensory Sensitivities */}
        <div className="flex items-start mb-6">
        
          <div>
            <h3 className="text-xl font-medium mb-2">👂{t("sensorySensitivity")}</h3>
            <ul className="list-disc list-inside space-y-1">
              {t("sensoryPoints", { returnObjects: true }).map((item, idx) => (
                <li key={`sensory-${idx}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Remember Section */}
      <section className="mb-8">
        <div className="flex items-start">
  
          <div>
            <h2 className="text-2xl font-semibold mb-3">💛{t("rememberTitle")}</h2>
            <ul className="list-disc list-inside space-y-1">
              {t("rememberPoints", { returnObjects: true }).map((item, idx) => (
                <li key={`remember-${idx}`}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutAutism;
