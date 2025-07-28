import React from 'react';
import { useTranslation } from 'react-i18next'; 
import { Helmet } from "react-helmet";

function Home() {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <Helmet>
        <title>{t('home_title')}</title>
        <meta name="description" content={t('home_description')} />
      </Helmet>
      
    </div>
  )
}
export default Home