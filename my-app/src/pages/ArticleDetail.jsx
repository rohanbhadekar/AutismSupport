import React from "react";
import { Link, useParams } from "react-router-dom";
import articles from "../data/articles.json";
import { useTranslation } from "react-i18next";

export default function ArticleDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").slice(0, 2);

  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <p className="text-lg">Article not found</p>
        <Link to="/articles" className="text-blue-600 mt-4 inline-block">
          ← {t?.("back") ?? "Back"}
        </Link>
      </div>
    );
  }

  const title = article.title?.[lang] || article.title?.en || "";
  const intro = article.intro?.[lang] || article.intro?.en || "";
  const qaList = article.qa?.[lang] || article.qa?.en || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/articles"
          className="text-sm text-blue-600 hover:underline block mb-2"
        >
          ← {t?.("back") ?? (lang === "hi" ? "वापस" : lang === "mr" ? "परत" : "Back")}
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>

        <div className="mt-3 flex items-center gap-3 text-sm text-gray-600">
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
            {lang.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Intro */}
      <article className="prose max-w-none mb-10 text-gray-700">
        <p className="leading-relaxed text-lg">{intro}</p>
      </article>

      {/* Q&A list */}
      <section aria-label="Questions and answers" className="space-y-6">
        {qaList.map((qa, i) => (
          <div
            key={i}
            className="rounded-xl bg-white border shadow-sm p-6"
          >
            <div className="mb-3 text-xl font-semibold text-gray-900">
              {qa.q}
            </div>
            <div className="text-gray-700 leading-relaxed">
              {qa.a}
            </div>
          </div>
        ))}
      </section>

      {/* Footer note */}
      <div className="mt-10 text-sm text-gray-500 border-t pt-4">
        {lang === "hi"
          ? "नोट: यह सामान्य मार्गदर्शन है। व्यक्तिगत सलाह के लिए विशेषज्ञ से मिलें।"
          : lang === "mr"
          ? "टीप: ही सामान्य मार्गदर्शन आहे. वैयक्तिक सल्ल्यासाठी तज्ञांचा सल्ला घ्या."
          : "Note: This is general guidance. For personalised advice, consult a professional."}
      </div>
    </div>
  );
}
