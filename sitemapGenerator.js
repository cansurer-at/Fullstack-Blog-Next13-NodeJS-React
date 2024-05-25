
const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = fs;

const generateSitemap = async () => {
  const sitemapStream = new SitemapStream({ hostname: 'http://localhost:3000' }); // Assuming localhost:3000 for local development

  // Add URLs to your sitemap
  sitemapStream.write({ url: '/', changefreq: 'daily', priority: 1 });

  // Add more URLs for your pages
  // Example: sitemapStream.write({ url: '/about', changefreq: 'weekly', priority: 0.8 });

  sitemapStream.end();

  const sitemapXML = await streamToPromise(sitemapStream).then((data) => data.toString());

  return sitemapXML;
};

generateSitemap().then((sitemapXML) => {
  const stream = createWriteStream('./public/sitemap.xml');
  stream.write(sitemapXML);
  stream.end();
});
