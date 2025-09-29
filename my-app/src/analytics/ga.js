// src/analytics/ga.js
export const GA_MEASUREMENT_ID = 'G-KH67J7K42Y';

export const pageview = (path) => {
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, { page_path: path });
  }
};

export const gaEvent = (name, params = {}) => {
  if (window.gtag) {
    window.gtag('event', name, params);
  }
};
