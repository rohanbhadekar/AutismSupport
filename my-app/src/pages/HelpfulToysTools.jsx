
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";
<Helmet>
  <title>Parenting Autism Together | Support for Indian Parents</title>
  <meta name="description" content="Explore resources, activities, and government schemes for autism parenting in India. Available in Marathi, Hindi, and English." />
  <meta name="keywords" content="Autism, Parenting, India, Activities, Government Schemes, Marathi, Hindi, English" />
  <link rel="canonical" href="https://parentingautismtogether.in/" />
</Helmet>
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