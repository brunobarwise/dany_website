export type BilingualItem = {
  icon: string;
  fr: string;
  en: string;
};

export type BilingualPlace = {
  name: string;
  fr: string;
  en: string;
};

export const nearby: BilingualItem[] = [
  { icon: '🏖️', fr: 'Plages à 15 min à pied ou 5 min à vélo', en: 'Beaches 15 min on foot or 5 min by bike' },
  { icon: '⛵', fr: "Port du Cap d'Agde et ses nombreux restaurants", en: "Cap d'Agde port with many restaurants" },
  { icon: '⛳', fr: "Golf, tennis, terrain d'aventures", en: 'Golf, tennis, adventure park' },
  { icon: '🚴', fr: 'Pistes cyclables tout autour', en: 'Cycling paths all around' },
  { icon: '🛒', fr: 'Tous commerces à proximité', en: 'All shops close by' },
  { icon: '🥖', fr: 'Marché traditionnel le samedi matin', en: 'Traditional market on Saturday mornings' },
];

export const region: BilingualPlace[] = [
  { name: 'Sète', fr: "Ville de charme, île singulière, Cimetière Marin de Brassens", en: "Charming island city, birthplace of Georges Brassens" },
  { name: 'Pézenas', fr: "Vieille ville médiévale, galeries d'art, marché", en: 'Medieval old town, art galleries, market' },
  { name: 'Portiragnes-Plage', fr: 'Village balnéaire familial, plage naturelle', en: 'Family seaside village with a natural beach' },
  { name: 'Étang de Thau', fr: "Dégustation d'huîtres et de moules, balade en kayak", en: 'Oyster and mussel tasting, kayaking' },
  { name: 'Lac du Salagou', fr: 'Lac rouge entre les vignes, baignade et randonnée', en: 'Red lake among vineyards, swimming and hiking' },
  { name: 'Cirque de Mourèze', fr: 'Formation géologique spectaculaire, dolomites', en: 'Spectacular dolomite rock formations' },
  { name: "St-Guilhem-le-Désert", fr: "Un des plus beaux villages de France, gorges de l'Hérault", en: "One of France's most beautiful villages, Hérault gorges" },
  { name: 'Montpellier', fr: 'Métropole vibrante, 45 min en voiture', en: 'Vibrant city, 45 min by car' },
  { name: 'Béziers', fr: 'Canal du Midi, arènes, art de vivre languedocien', en: 'Canal du Midi, bullring, Languedoc lifestyle' },
  { name: 'Narbonne', fr: 'Cité romaine, cathédrale, marché couvert', en: 'Roman city, cathedral, covered market' },
];
