export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain');
  return `User-agent: *
Allow: /

Sitemap: https://houedanou.com/sitemap.xml`;
});
