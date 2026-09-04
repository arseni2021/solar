import { localizedHref, type Lang } from './i18n';

export { localizedHref };

export const SITE = {
  name: 'Ecosolar',
  legalName: 'Eco Solar Park SRL',
  domain: 'https://www.ecosolar.md',
  email: 'eugen@ecosolar.md',
  phone: '',
  responseTime: 'Răspuns în 24 de ore',
  workHours: 'Luni–Vineri: 9:00–18:00',
  anreLicenseNumber: '',
  anreLicenseDate: '',
  eicCode: '',
  idno: '',
  legalAddress: '',
  web3formsKey: '',
  ga4Id: '',
  gscVerification: '',
  clarityId: '',
  bingUetTagId: '',
  facebookUrl: '',
  linkedinUrl: '',
  instagramUrl: '',
  ownGenerationDescription: '',
  wholesaleMarketNote: '',
  preParticipantsCount: '',
  clientPlatformStatus: '',
  currentEcosolarTariffBaniKWh: '',
  currentRegulatedTariffBaniKWh: '',
  ppaThresholdText: '',
  switchingProcessingDays: '',
  returnToRegulatedSupplierNote: '',
  contractTemplateUrl: '',
  switchRequestFormUrl: '',
  powerOfAttorneyTemplateUrl: '',
} as const;

export function hasValue(v: string): boolean {
  return v.trim().length > 0;
}

export const SITE_TEXT: Record<Lang, { responseTime: string; workHours: string }> = {
  ro: { responseTime: 'Răspuns în 24 de ore', workHours: 'Luni–Vineri: 9:00–18:00' },
  ru: { responseTime: 'Ответ в течение 24 часов', workHours: 'Пн–Пт: 9:00–18:00' },
};

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

const NAV_RO: NavItem[] = [
  {
    label: 'Pentru afaceri',
    href: '/pentru-afaceri',
    children: [
      { label: 'Energie verde certificată', href: '/pentru-afaceri/energie-verde-pentru-companii' },
      { label: 'Soluții pentru industrie', href: '/pentru-afaceri/solutii-industriale' },
    ],
  },
  { label: 'Piața liberă', href: '/piata-libera-energie-electrica' },
  { label: 'Servicii PRE', href: '/servicii-echilibrare-pre' },
  { label: 'Blog', href: '/blog' },
  { label: 'Despre noi', href: '/despre-noi' },
];

const NAV_RU: NavItem[] = [
  {
    label: 'Для бизнеса',
    href: '/pentru-afaceri',
    children: [
      { label: 'Сертифицированная зелёная энергия', href: '/pentru-afaceri/energie-verde-pentru-companii' },
      { label: 'Решения для промышленности', href: '/pentru-afaceri/solutii-industriale' },
    ],
  },
  { label: 'Свободный рынок', href: '/piata-libera-energie-electrica' },
  { label: 'Услуги PRE', href: '/servicii-echilibrare-pre' },
  { label: 'Блог', href: '/blog' },
  { label: 'О компании', href: '/despre-noi' },
];

function withLocalizedHrefs(items: NavItem[], lang: Lang): NavItem[] {
  return items.map((item) => ({
    ...item,
    href: localizedHref(lang, item.href),
    children: item.children?.map((c) => ({ ...c, href: localizedHref(lang, c.href) })),
  }));
}

export function getMainNav(lang: Lang): NavItem[] {
  return withLocalizedHrefs(lang === 'ru' ? NAV_RU : NAV_RO, lang);
}

const FOOTER_AFACERI_RO = [
  { label: 'Furnizarea energiei electrice', href: '/pentru-afaceri' },
  { label: 'Energie verde certificată', href: '/pentru-afaceri/energie-verde-pentru-companii' },
  { label: 'Soluții pentru industrie', href: '/pentru-afaceri/solutii-industriale' },
  { label: 'Calculator economie', href: '/calculator-economie' },
];

const FOOTER_AFACERI_RU = [
  { label: 'Поставка электроэнергии', href: '/pentru-afaceri' },
  { label: 'Сертифицированная зелёная энергия', href: '/pentru-afaceri/energie-verde-pentru-companii' },
  { label: 'Решения для промышленности', href: '/pentru-afaceri/solutii-industriale' },
  { label: 'Калькулятор экономии', href: '/calculator-economie' },
];

export function getFooterAfaceri(lang: Lang) {
  return withLocalizedHrefs(lang === 'ru' ? FOOTER_AFACERI_RU : FOOTER_AFACERI_RO, lang) as NavChild[];
}

const FOOTER_RESURSE_RO = [
  { label: 'Piața liberă de energie electrică', href: '/piata-libera-energie-electrica' },
  { label: 'Servicii de echilibrare (PRE)', href: '/servicii-echilibrare-pre' },
  { label: 'Blog', href: '/blog' },
  { label: 'Licență și transparență', href: '/despre-noi/licenta-si-transparenta' },
];

const FOOTER_RESURSE_RU = [
  { label: 'Свободный рынок электроэнергии', href: '/piata-libera-energie-electrica' },
  { label: 'Услуги балансирования (PRE)', href: '/servicii-echilibrare-pre' },
  { label: 'Блог', href: '/blog' },
  { label: 'Лицензия и прозрачность', href: '/despre-noi/licenta-si-transparenta' },
];

export function getFooterResurse(lang: Lang) {
  return withLocalizedHrefs(lang === 'ru' ? FOOTER_RESURSE_RU : FOOTER_RESURSE_RO, lang) as NavChild[];
}

export function articleHref(lang: Lang, slug: string) {
  return localizedHref(lang, `/blog/${slug}`);
}
