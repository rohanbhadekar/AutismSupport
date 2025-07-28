const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const sitemap = new SitemapStream({ hostname: 'https://parentingautismtogether.in' });

// Add all the paths manually
sitemap.write({ url: '/', changefreq: 'weekly', priority: 1.0 });
sitemap.write({ url: '/about', changefreq: 'monthly' });
sitemap.write({ url: '/contact', changefreq: 'monthly' });
sitemap.write({ url: '/home-activities', changefreq: 'weekly' });
sitemap.write({ url: '/social-stories', changefreq: 'monthly' });
sitemap.write({ url: '/helpful-toys-tools', changefreq: 'monthly' });
sitemap.write({ url: '/govt-schemes', changefreq: 'monthly' });

sitemap.end();

streamToPromise(sitemap).then((sm) =>
  createWriteStream('public/sitemap.xml').end(sm)
);
