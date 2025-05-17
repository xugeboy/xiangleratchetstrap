// next-sitemap.config.js
const supportedLocales = ['fr', 'de', 'es','uk','au'];

module.exports = {
  siteUrl: 'https://xiangleratchetstrap.com',
  generateRobotsTxt: true,
  exclude: [
    '/server-sitemap.xml',
    '/[lang]/server-sitemap.xml',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://xiangleratchetstrap.com/server-sitemap.xml",
      ...supportedLocales.map(locale => `https://xiangleratchetstrap.com/${locale}/server-sitemap.xml`)
    ]
  },
};
