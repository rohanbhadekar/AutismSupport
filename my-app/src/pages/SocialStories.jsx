

import React from 'react';
import { useTranslation } from 'react-i18next';

function SocialStories() {
  const { t } = useTranslation();

  return (
     <div className="p-4">
      <h2 className="text-2xl font-semibold">{t('nav.socialStoriesTitle')}</h2>
      <p className="text-base leading-relaxed">{t('nav.socialStoriesDescription')}</p>
    </div>
  );
}   

export default SocialStories;