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

  const linkClasses = ({ isActive }) =>
    `block text-sm font-medium px-4 py-2 rounded transition-all ${
      isActive ? "text-blue-700 bg-blue-100" : "text-gray-700 hover:bg-gray-100"
    }`;

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <header className="bg-[#fbfaf7] shadow-md border-b sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Parenting Autism Together" className="h-12 sm:h-16 w-auto object-contain p-1" />
          <span className="text-base sm:text-lg font-semibold tracking-wide text-blue-800">
            Parenting&nbsp;Autism&nbsp;Together
          </span>
        </div>

        {/* Right: Ask (signed-in only) + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Ask Question (desktop) — only when signed in */}
          <SignedIn>
            <Link
              to="/qa"
              className="hidden sm:inline-flex items-center bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700"
            >
              + Ask Question
            </Link>
          </SignedIn>

          {/* (Optional) show Sign In CTA instead of Ask when signed out */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="hidden sm:inline-flex items-center text-sm px-3 py-1.5 rounded border border-blue-600 text-blue-700 hover:bg-blue-50">
                Sign in to Ask
              </button>
            </SignInButton>
          </SignedOut>

          {/* Universal hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" onClick={() => setMenuOpen(false)} />
          <aside
            id="site-drawer"
            className="fixed right-0 top-0 h-full w-[90%] sm:w-[420px] bg-white shadow-2xl border-l flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div className="px-4 py-3 border-b flex items-center justify-between bg-[#fbfaf7]">
              <div className="flex items-center gap-2">
                <img src={Logo} alt="Parenting Autism Together" className="h-10 w-auto object-contain" />
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

            <nav className="p-4 flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-2">
                <li>
                  <NavLink to="/" className={linkClasses} onClick={() => setMenuOpen(false)}>
                    <span className="mr-2">{t("nav.homeEmoji")}</span> {t("nav.home")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={linkClasses} onClick={() => setMenuOpen(false)}>
                    <span className="mr-2">{t("nav.aboutAutismEmoji")}</span> {t("nav.aboutAutism")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/home-activities" className={linkClasses} onClick={() => setMenuOpen(false)}>
                    <span className="mr-2">{t("nav.homeActivitiesEmoji")}</span> {t("nav.homeActivities")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/social-stories" className={linkClasses} onClick={() => setMenuOpen(false)}>
                    <span className="mr-2">{t("nav.socialStoriesEmoji")}</span> {t("nav.socialStories")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/govt-schemes" className={linkClasses} onClick={() => setMenuOpen(false)}>
                    <span className="mr-2">{t("nav.govtSchemesEmoji")}</span> {t("nav.govtSchemes")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/articles" className={linkClasses} onClick={() => setMenuOpen(false)}>
                    <span className="mr-2">{t("nav.articlesEmoji")}</span> {t("nav.articles")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={linkClasses} onClick={() => setMenuOpen(false)}>
                    <span className="mr-2">{t("nav.contactEmoji")}</span> {t("nav.contact")}
                  </NavLink>
                </li>

                {/* Ask Question (drawer) — only when signed in */}
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

                {/* Signed out: show Sign In CTA instead */}
                <SignedOut>
                  <li>
                    <SignInButton mode="modal">
                      <button
                        onClick={() => setMenuOpen(false)}
                        className="w-full text-center text-sm px-3 py-2 rounded border border-blue-600 text-blue-700 hover:bg-blue-50"
                      >
                        Sign in to Ask
                      </button>
                    </SignInButton>
                  </li>
                </SignedOut>
              </ul>

              <hr className="my-4" />

              {/* language switcher */}
              <div className="flex gap-3 items-center">
                <span className="text-xs uppercase text-gray-500 tracking-wide">Language</span>
                <div className="flex gap-2">
                  <button onClick={() => changeLanguage("en")} className="text-sm px-3 py-1 rounded border hover:bg-gray-50">EN</button>
                  <button onClick={() => changeLanguage("hi")} className="text-sm px-3 py-1 rounded border hover:bg-gray-50">हिंदी</button>
                  <button onClick={() => changeLanguage("mr")} className="text-sm px-3 py-1 rounded border hover:bg-gray-50">म</button>
                </div>
              </div>

              {/* auth section */}
              <div className="mt-4 flex items-center gap-3">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded">Login / Sign up</button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
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
