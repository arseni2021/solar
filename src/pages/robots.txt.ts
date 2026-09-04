import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const isPreview = import.meta.env.PUBLIC_PREVIEW === 'true';

  const body = isPreview
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n\nSitemap: https://www.ecosolar.md/sitemap-index.xml\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
