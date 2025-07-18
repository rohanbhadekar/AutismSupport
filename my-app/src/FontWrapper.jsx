import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FontWrapper({ children }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const fontClass =
    lang === 'mr' ? 'font-marathi'
    : lang === 'hi' ? 'font-hindi'
    : 'font-english';

  return <div className={fontClass}>{children}</div>;
}