import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../assets/ParentingAutismTogether_Logo.png";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const currentLang = i18n?.language || "en";

  const linkClasses = ({ isActive }) =>
    `block text-sm font-medium px-4 py-2 rounded transition-all ${
      isActive ? "text-blue-700 bg-blue-100" : "text-gray-700 hover:bg-gray-100"
    }`;

  const changeLanguage = (lng) => {
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lng);
    }
    setMenuOpen(false);
  };

  return (
    <header className="bg-[#fbfaf7] shadow-md border-b sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Parenting Autism Together"
            className="h-12 sm:h-14 w-auto object-contain"
            loading="lazy"
          />
          <span className="text-base sm:text-lg font-semibold tracking-wide text-blue-800 leading-none">
            Parenting&nbsp;Autism&nbsp;Together
          </span>
        </Link>

        {/* Right: Lang + Auth + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Language pills */}
          <div className="hidden sm:flex items-center gap-2" role="toolbar" aria-label="Language switcher">
            {["en", "hi", "mr"].map((lng) => (
              <button
                key={lng}
                onClick={() => changeLanguage(lng)}
                aria-pressed={currentLang === lng}
                aria-label={`Switch to ${lng}`}
                className={`text-sm px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                  currentLang === lng
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {lng === "en" ? "EN" : lng === "hi" ? "हिंदी" : "म"}
              </button>
            ))}
          </div>

          {/* Auth / Ask */}
          <SignedIn>
            <Link
              to="/qa"
              title="Ask a question"
              className="hidden sm:inline-flex items-center bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              + Ask Question
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button
                title="Sign in to ask"
                className="hidden sm:inline-flex items-center text-sm px-3 py-1.5 rounded border border-blue-600 text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Join and Ask
              </button>
            </SignInButton>
          </SignedOut>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:ml-2"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-drawer"
          >
            <svg className="h-7 w-7 text-gray-800" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            id="site-drawer"
            className="fixed right-0 top-0 h-full w-[90%] sm:w-[420px] bg-white shadow-2xl border-l flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            {/* Drawer Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between bg-[#fbfaf7]">
              <div className="flex items-center gap-2">
                <img src={Logo} alt="Parenting Autism Together" className="h-10 w-auto object-contain" loading="lazy" />
                <span className="font-semibold text-blue-800">Menu</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Navigation */}
            <nav className="p-4 flex-1 overflow-y-auto text-sm" role="navigation" aria-label="Drawer navigation">
              <h3 className="uppercase text-gray-500 text-xs font-semibold mb-2">{t("nav.explore")}</h3>
              <ul className="flex flex-col gap-2 mb-4">
                <li><NavLink to="/" className={linkClasses} onClick={() => setMenuOpen(false)}>{t("nav.homeEmoji")} {t("nav.home")}</NavLink></li>
                <li><NavLink to="/about" className={linkClasses} onClick={() => setMenuOpen(false)}>{t("nav.aboutAutismEmoji")} {t("nav.aboutAutism")}</NavLink></li>
                <li><NavLink to="/home-activities" className={linkClasses} onClick={() => setMenuOpen(false)}>{t("nav.homeActivitiesEmoji")} {t("nav.homeActivities")}</NavLink></li>
                <li><NavLink to="/social-stories" className={linkClasses} onClick={() => setMenuOpen(false)}>{t("nav.socialStoriesEmoji")} {t("nav.socialStories")}</NavLink></li>
                <li><NavLink to="/govt-schemes" className={linkClasses} onClick={() => setMenuOpen(false)}>{t("nav.govtSchemesEmoji")} {t("nav.govtSchemes")}</NavLink></li>
                <li><NavLink to="/articles" className={linkClasses} onClick={() => setMenuOpen(false)}>{t("nav.articlesEmoji")} {t("nav.articles")}</NavLink></li>
              </ul>

              <h3 className="uppercase text-gray-500 text-xs font-semibold mb-2">{t("nav.connect")}</h3>
              <ul className="flex flex-col gap-2">
                <li><NavLink to="/contact" className={linkClasses} onClick={() => setMenuOpen(false)}>{t("nav.contactEmoji")} {t("nav.contact")}</NavLink></li>
                <SignedIn>
                  <li>
                    <Link
                      to="/qa"
                      onClick={() => setMenuOpen(false)}
                      className="block text-center bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700"
                    >
                      + Ask Question
                    </Link>
                  </li>
                </SignedIn>
                <SignedOut>
                  <li>
                    <SignInButton mode="modal">
                      <button
                        onClick={() => setMenuOpen(false)}
                        className="w-full text-center text-sm px-3 py-2 rounded border border-blue-600 text-blue-700 hover:bg-blue-50"
                      >
                       Join and Ask
                      </button>
                    </SignInButton>
                  </li>
                </SignedOut>
              </ul>

              {/* Language fallback (mobile only) */}
              <div className="mt-6">
                <span className="block text-xs text-gray-500 mb-1">Language</span>
                <div className="flex gap-2">
                  {["en", "hi", "mr"].map((lng) => (
                    <button
                      key={lng}
                      onClick={() => changeLanguage(lng)}
                      className={`text-sm px-3 py-1 rounded-full ${
                        currentLang === lng ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-700"
                      }`}
                    >
                      {lng === "en" ? "EN" : lng === "hi" ? "हिंदी" : "म"}
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            <div className="px-4 py-3 border-t text-xs text-gray-500">
              © {new Date().getFullYear()} Parenting Autism Together
            </div>
          </aside>
        </>
      )}
    </header>
  );
};

export default Header;
