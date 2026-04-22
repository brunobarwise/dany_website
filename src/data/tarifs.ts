import type { Lang } from '../i18n';

export interface Rate {
  period: Record<Lang, string>;
  price: number;
  note?: Record<Lang, string>;
}

export const paymentConditions: Record<Lang, string[]> = {
  fr: [
    "40% d'arrhes à la réservation par virement et complément 10 jours avant l'arrivée.",
    "Un dépôt de garantie d'un montant de 500 € en chèque ou espèces.",
  ],
  en: [
    '40% deposit required at the time of booking via bank transfer, with the balance due 10 days before arrival.',
    'A refundable €500 security deposit (cash accepted).',
  ],
};

export const weeklyRates: Rate[] = [
  {
    period: { fr: 'Fin mai – 4 juillet', en: 'Late May – 4 July' },
    price: 430,
    note: { fr: '3 nuits min. possible', en: '3-night min. stay possible' },
  },
  {
    period: { fr: '4 juillet – 31 juillet', en: '4 July – 31 July' },
    price: 495,
    note: { fr: 'Sam. au sam. uniquement', en: 'Sat. to Sat. only' },
  },
  {
    period: { fr: '1ᵉʳ août – 22 août', en: '1 August – 22 August' },
    price: 560,
    note: { fr: 'Sam. au sam. uniquement', en: 'Sat. to Sat. only' },
  },
  {
    period: { fr: '22 août – 30 septembre', en: '22 August – 30 September' },
    price: 455,
    note: { fr: '3 nuits min. possible', en: '3-night min. stay possible' },
  },
];

export const tarifsLabels: Record<Lang, {
  paymentTitle: string;
  weeklyTitle: string;
  availability: string;
  colPeriod: string;
  colPrice: string;
  colNote: string;
  cta: string;
}> = {
  fr: {
    paymentTitle: 'Modalités de paiement',
    weeklyTitle: 'À la semaine',
    availability: 'Me contacter pour les disponibilités',
    colPeriod: 'Période',
    colPrice: 'Tarif / sem.',
    colNote: 'Conditions',
    cta: 'Prix négociable pour plusieurs semaines.',
  },
  en: {
    paymentTitle: 'Payment terms',
    weeklyTitle: 'Weekly rates',
    availability: 'Contact me for availability',
    colPeriod: 'Period',
    colPrice: 'Rate / week',
    colNote: 'Conditions',
    cta: 'Negotiable rates for multiple weeks.',
  },
};