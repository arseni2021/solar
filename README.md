# ecosolar.md

Site static (Astro + Tailwind CSS) pentru Eco Solar Park SRL, furnizor licențiat ANRE de energie electrică din
surse regenerabile pentru companii din Republica Moldova. Site bilingv: română (`ro`, implicit) și rusă (`ru`).

## Stack

- **Astro**: generare statică, fără server/CMS/bază de date.
- **Astro i18n routing**: `ro` este limba implicită, fără prefix (`/pentru-afaceri`); `ru` are prefix `/ru/`
  (`/ru/pentru-afaceri`). Configurat în `astro.config.mjs`.
- **Tailwind CSS v4**: design system cu tokeni personalizați în `src/styles/global.css`.
- **astro-icon** + `@iconify-json/lucide`: iconografie line-icons.
- **Content Collections**: `src/content/articles` (ro) și `src/content/articles-ru` (ru), cu slug-uri identice
  între cele două limbi.
- **Web3Forms**: trimiterea formularului de ofertă, fără backend propriu.
- **@astrojs/sitemap**: generare automată `sitemap-index.xml`, cu hreflang `ro-MD`/`ru-MD` pentru fiecare pereche
  de pagini.

## Comenzi

```bash
npm install
npm run dev       # server local, http://localhost:4321
npm run build     # build static în dist/
npm run preview   # previzualizare build local
```

## Structură

```
src/
  components/         # Header, Footer, Button, Card, FAQAccordion, Calculator, RequestForm, ...
                       # (majoritatea acceptă un prop `lang` pentru textele de interfață)
  layouts/            # BaseLayout.astro, ArticleLayout.astro (ambele acceptă `lang`)
  pages/              # rutele în română (implicite, fără prefix)
  pages/ru/           # rutele în rusă, oglindă exactă a structurii de mai sus
  content/articles/       # articole de blog în română (Markdown + frontmatter)
  content/articles-ru/    # aceleași articole, în rusă, cu slug-uri identice
  content.config.ts       # schema celor două colecții de articole
  lib/site.ts         # configurare centrală (contact, licență, chei API, tarife calculator, navigare)
  lib/i18n.ts         # dicționar de texte de interfață ro/ru + helpere pentru URL-uri localizate
public/
  logo.png, favicon-*.png, og-image.jpg  # generate din logo-ul oficial ecosolar.md
```

## Adăugarea de conținut nou

Orice pagină sau articol nou trebuie creat în ambele limbi, cu același slug, pentru ca:
- comutatorul de limbă din header să poată lega corect cele două versiuni;
- `sitemap-index.xml` să genereze automat hreflang-urile corecte.

## Înainte de lansare

Vezi [CONFIGURARE.md](./CONFIGURARE.md) pentru lista completă de date reale (licență ANRE, telefon, chei de API,
tarife curente) care trebuie completate înainte de publicare, în `src/lib/site.ts`.

## Deploy

Proiect complet static, poate fi deploy-uit fără configurare suplimentară pe Cloudflare Pages, Netlify sau Vercel
(build command: `npm run build`, output directory: `dist`).
