import React from 'react';
import { useTranslation } from 'react-i18next'; 
function Home() {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">{t('home_title')}</h2>
      <p className="text-base leading-relaxed">{t('home_description')}</p>
    </div>
  )
}
export default Home