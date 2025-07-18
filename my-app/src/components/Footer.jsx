import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blue-100 text-blue-900 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <div>
          © {year} {t('title')}. {t('rights_reserved')}.
        </div>

        <div className="mt-2 md:mt-0 flex gap-4">
          <a href="/contact" className="hover:underline">
            <span>{t("nav.contactEmoji")}</span> {t("nav.contact")}
          </a>
          
        </div>
      </div>
    </footer>
  );
}
export default  Footer;