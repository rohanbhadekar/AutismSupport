import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-1 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
      isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
    }`;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-sm">
  <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-nowrap items-center justify-between">
    
    {/* Logo */}
    <div className="text-xl font-bold text-blue-700 whitespace-nowrap mr-4">
      Autism <span className="block sm:inline">Support</span>
    </div>

    {/* Nav + Lang container */}
    <div className="flex flex-nowrap items-center justify-between w-full overflow-x-auto gap-4">
      <nav className="flex flex-wrap gap-2 items-center min-w-0">
        <NavLink to="/" className={linkClasses}>
          <span>{t("nav.homeEmoji")}</span> {t("nav.home")}
        </NavLink>
        <NavLink to="/about" className={linkClasses}>
          <span>{t("nav.aboutAutismEmoji")}</span> {t("nav.aboutAutism")}
        </NavLink>
        <NavLink to="/home-activities" className={linkClasses}>
          <span>{t("nav.homeActivitiesEmoji")}</span> {t("nav.homeActivities")}
        </NavLink>
        <NavLink to="/social-stories" className={linkClasses}>
          <span>{t("nav.socialStoriesEmoji")}</span> {t("nav.socialStories")}
        </NavLink>
        <NavLink to="/govt-schemes" className={linkClasses}>
          <span>{t("nav.govtSchemesEmoji")}</span> {t("nav.govtSchemes")}
        </NavLink>
        <NavLink to="/helpful-toys-tools" className={linkClasses}>
          <span>{t("nav.helpfulToysToolsEmoji")}</span> {t("nav.helpfulToysTools")}
        </NavLink>
        <NavLink to="/contact" className={linkClasses}>
          <span>{t("nav.contactEmoji")}</span> {t("nav.contact")}
        </NavLink>
      </nav>

      {/* Language Switcher */}
      <div className="flex items-center gap-2 ml-4 shrink-0">
        <button onClick={() => changeLanguage("en")} className="hover:underline">EN</button>
        <button onClick={() => changeLanguage("hi")} className="hover:underline">हिंदी</button>
        <button onClick={() => changeLanguage("mr")} className="hover:underline">म</button>
      </div>
    </div>
  </div>
</header>
  );
};

export default Header;
