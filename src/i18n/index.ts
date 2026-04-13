import fr from './fr.json';
import en from './en.json';

export type Lang = 'fr' | 'en';
export const defaultLang: Lang = 'fr';

const dicts = { fr, en } as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof fr): string {
    return (dicts[lang] as Record<string, string>)[key]
      ?? (dicts[defaultLang] as Record<string, string>)[key]
      ?? key;
  };
}

export function getAlternateUrl(url: URL): string {
  const parts = url.pathname.split('/');
  if (parts[1] === 'fr') {
    parts[1] = 'en';
    if (parts[2] === 'autour') parts[2] = 'around';
    if (parts[2] === 'reserver') parts[2] = 'book';
  } else {
    parts[1] = 'fr';
    if (parts[2] === 'around') parts[2] = 'autour';
    if (parts[2] === 'book') parts[2] = 'reserver';
  }
  return parts.join('/') || '/fr';
}
