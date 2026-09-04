export type Lang = 'ro' | 'ru';

export function localizedHref(lang: Lang, path: string) {
  if (lang === 'ru') return `/ru${path === '/' ? '' : path}`;
  return path;
}

export function alternatePath(pathname: string, lang: Lang) {
  if (lang === 'ru') {
    const roPath = pathname.replace(/^\/ru(\/|$)/, '/');
    return { ro: roPath === '' ? '/' : roPath, ru: pathname };
  }
  const ruPath = `/ru${pathname === '/' ? '' : pathname}`;
  return { ro: pathname, ru: ruPath };
}

export const UI: Record<Lang, {
  home: string;
  requestOffer: string;
  readMore: string;
  viewDetails: string;
  publishedOn: string;
  updatedOn: string;
  allArticles: string;
  langSwitchLabel: string;
}> = {
  ro: {
    home: 'Acasă',
    requestOffer: 'Solicită o ofertă',
    readMore: 'Citește',
    viewDetails: 'Vezi detalii',
    publishedOn: 'Publicat pe',
    updatedOn: 'Actualizat pe',
    allArticles: 'Toate',
    langSwitchLabel: 'RU',
  },
  ru: {
    home: 'Главная',
    requestOffer: 'Запросить предложение',
    readMore: 'Читать',
    viewDetails: 'Подробнее',
    publishedOn: 'Опубликовано',
    updatedOn: 'Обновлено',
    allArticles: 'Все',
    langSwitchLabel: 'RO',
  },
};
