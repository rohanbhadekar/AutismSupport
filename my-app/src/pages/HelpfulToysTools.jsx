
import React from 'react';
import { useTranslation } from 'react-i18next';

function HelpfulToysTools() {
  const { t } = useTranslation();

  return (
     <div className="p-4">
      <h2 className="text-2xl font-semibold">{t('nav.helpfulToysToolsTitle')}</h2>
      <p className="text-base leading-relaxed">{t('nav.helpfulToysToolsDescription')}</p>
    </div>
  );
}   

export default HelpfulToysTools;