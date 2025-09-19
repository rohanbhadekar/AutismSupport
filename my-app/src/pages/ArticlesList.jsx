import React from "react";
import { Link } from "react-router-dom";
import articles from "../data/articles.json";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react"; // nice arrow icon

export default function ArticlesList() {
  const { t,i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en"; // normalize "en-US" → "en"

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
         {t('nav.articlesTitle')}
        </h1>
        <p className="mt-2 text-gray-600">
          {lang === "hi"
            ? "माता-पिता के लिए मार्गदर्शन और प्रेरणा"
            : lang === "mr"
            ? "पालकांसाठी मार्गदर्शन व प्रेरणा"
            : "Guidance and inspiration for parents"}
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {articles.map((a) => {
          const title = a.title[lang] || a.title.en;
          const intro = a.intro[lang] || a.intro.en;

          return (
            <Link
              key={a.id}
              to={`/articles/${a.id}`}
              className="group block border rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                {title}
              </h2>
              <p className="mt-2 text-gray-600 line-clamp-3">{intro}</p>
              <div className="mt-4 flex items-center text-blue-600 font-medium">
                {lang === "hi"
                  ? "पढ़ें"
                  : lang === "mr"
                  ? "वाचा"
                  : "Read More"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
