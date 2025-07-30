import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../assets/ParentingAutismTogether_Logo.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const linkClasses = ({ isActive }) =>
    `block text-sm font-medium px-4 py-2 rounded transition-all ${
      isActive ? "text-blue-700 bg-blue-100" : "text-gray-700 hover:bg-gray-100"
    }`;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-[#fbfaf7] shadow-md border-b">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Hamburger */}
        <div className="flex items-center gap-4">
          <img
            src={Logo}
            alt="Parenting Autism Together"
            className="h-12 sm:h-16 w-auto object-contain p-1"
          />

          

            {/* Tiny brand label ‑‑ mobile only */}
            <span className="ml-2 text-base font-semibold tracking-wide text-blue-800 sm:hidden">
              Parenting Autism Together
            </span>
            <div className="flex items-right gap-2">

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none sm:hidden"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-wrap gap-4 items-center">
          <NavLink to="/" className={linkClasses}>
            <span>{t("nav.homeEmoji")}</span> {t("nav.home")}
          </NavLink>
          <NavLink to="/about" className={linkClasses}>
            <span>{t("nav.aboutAutismEmoji")}</span> {t("nav.aboutAutism")}
          </NavLink>
          <NavLink to="/home-activities" className={linkClasses}>
            <span>{t("nav.homeActivitiesEmoji")}</span>{" "}
            {t("nav.homeActivities")}
          </NavLink>
          <NavLink to="/social-stories" className={linkClasses}>
            <span>{t("nav.socialStoriesEmoji")}</span> {t("nav.socialStories")}
          </NavLink>
          <NavLink to="/govt-schemes" className={linkClasses}>
            <span>{t("nav.govtSchemesEmoji")}</span> {t("nav.govtSchemes")}
          </NavLink>
          <NavLink to="/helpful-toys-tools" className={linkClasses}>
            <span>{t("nav.helpfulToysToolsEmoji")}</span>{" "}
            {t("nav.helpfulToysTools")}
          </NavLink>
          <NavLink to="/contact" className={linkClasses}>
            <span>{t("nav.contactEmoji")}</span> {t("nav.contact")}
          </NavLink>
        </nav>

        {/* Language Switcher */}
        <div className="hidden lg:flex gap-2 items-center ml-4">
          <button
            onClick={() => changeLanguage("en")}
            className="text-sm hover:underline"
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("hi")}
            className="text-sm hover:underline"
          >
            हिंदी
          </button>
          <button
            onClick={() => changeLanguage("mr")}
            className="text-sm hover:underline"
          >
            म
          </button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.homeEmoji")}</span> {t("nav.home")}
            </NavLink>
            <NavLink
              to="/about"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.aboutAutismEmoji")}</span> {t("nav.aboutAutism")}
            </NavLink>
            <NavLink
              to="/home-activities"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.homeActivitiesEmoji")}</span> {t("nav.homeActivities")}
            </NavLink>
            <NavLink
              to="/social-stories"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.socialStoriesEmoji")}</span> {t("nav.socialStories")}
            </NavLink>
            <NavLink
              to="/govt-schemes"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.govtSchemesEmoji")}</span> {t("nav.govtSchemes")}
            </NavLink>
            <NavLink
              to="/helpful-toys-tools"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              <span>{t("nav.helpfulToysToolsEmoji")}</span> {t("nav.helpfulToysTools")}
            </NavLink>
            <NavLink
              to="/contact"
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            > <span>{t("nav.contactEmoji")}</span>
              {t("nav.contact")}
            </NavLink>
            {/* Mobile Language Switcher */}
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => changeLanguage("en")}
                className="text-sm hover:underline"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("hi")}
                className="text-sm hover:underline"
              >
                हिंदी
              </button>
              <button
                onClick={() => changeLanguage("mr")}
                className="text-sm hover:underline"
              >
                म
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
