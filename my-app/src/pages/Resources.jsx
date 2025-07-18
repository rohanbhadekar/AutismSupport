import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * ResourcePage.jsx – lists autism-related resources with search & filter.
 * i18n keys now under `resourcesContent` (not `resources`).
 * Resources JSON is fetched from /data/resources.json at runtime.
 */

const categoryKeys = [
  "all",
  "support",
  "helpline",
  "government",
  "tools",
  "videos"
];

export default function ResourcePage() {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/resources.json")
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error("Failed to load resources", err))
      .finally(() => setLoading(false));
  }, []);

  const lang = i18n.language || "en";

  const filtered = resources.filter((r) => {
    const text = `${r[`title_${lang}`]} ${r[`description_${lang}`]}`.toLowerCase();
    const matchesSearch = text.includes(query.toLowerCase());
    const matchesCat = cat === "all" || r.category === cat;
    return matchesSearch && matchesCat;
  });

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {t("resourcesContent.heading", "Empower Every Autism Journey")}
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder={t("resourcesContent.search", "Search…")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          {categoryKeys.map((key) => (
            <option key={key} value={key}>
              {t(`resourcesContent.categories.${key}`, key)}
            </option>
          ))}
        </select>
      </div>

      {/* Cards / States */}
      {loading ? (
        <p className="text-gray-600">{t("resourcesContent.loading", "Loading…")}</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-600">{t("resourcesContent.noMatch", "No resources found.")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-2xl p-4 shadow hover:shadow-lg transition-shadow bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">{r[`title_${lang}`]}</h2>
              <p className="text-gray-700 text-sm">{r[`description_${lang}`]}</p>
              <span className="inline-block mt-3 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {t(`resourcesContent.categories.${r.category}`, r.category)}
              </span>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
