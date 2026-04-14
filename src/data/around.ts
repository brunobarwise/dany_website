export type BilingualItem = {
  icon: string;
  fr: string;
  en: string;
};

export type BilingualPlace = {
  name: string;
  distance: string;
  tagline: { fr: string; en: string };
  fr: string;
  en: string;
  tags: string[];
  href?: string;
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
  {
    name: 'Sète',
    distance: '25 min',
    tagline: {
      fr: "L'île singulière, cité de Brassens",
      en: "The singular island, city of Brassens",
    },
    fr: "Construite sur un rocher entre mer et étang, Sète est une ville-port à l'âme populaire et méditerranéenne. Flânez sur les canaux animés de la Corniche, plongez dans le marché couvert des Halles pour découvrir les tielles (petits pâtés de poulpe épicés), et montez au Cimetière Marin où repose Georges Brassens. Ne manquez pas les joutes nautiques en été ni les tableaux d'artistes locaux dans les ateliers du quai.",
    en: "Charming island city, its covered market and local speciality tielles octopus pies, birthplace of Georges Brassens",
    tags: ['sea', 'culture', 'food'],
  },
  {
    name: 'Pézenas',
    distance: '30 min',
    tagline: {
      fr: 'Ville de Molière, cœur médiéval préservé',
      en: "Molière's city, preserved medieval heart",
    },
    fr: "Station intimiste nichée entre les étangs et la Méditerranée, Portiragnes-Plage offre plusieurs kilomètres de plage de sable naturelle peu fréquentée, idéale pour les familles. Le village-vacances conserve une atmosphère tranquille, loin de la foule du Cap d'Agde. Location de vélos, pistes cyclables longeant les étangs, et accès direct à la plage naturiste pour les plus aventureux.",
    en: 'Medieval old town, art galleries, market',
    tags: ['culture', 'village', 'history'],
  },
  {
    name: 'Portiragnes-Plage & Serignan-Plage',
    distance: '30 min',
    tagline: {
      fr: 'Plages naturelles, ambiance familiale',
      en: 'Natural beaches, family atmosphere',
    },
    fr: 'Nichées entre les étangs et la Méditerranée, plusieurs kilomètres de plage de sable naturelle. Canoë entre l\'Orb et la mer pour les plus aventureux.',
    en: 'Family seaside village with a natural beach',
    tags: ['sea', 'nature', 'family'],
  },
  {
    name: 'Étang de Thau',
    distance: '25 min',
    tagline: {
      fr: 'Le royaume des huîtres et des moules',
      en: 'Kingdom of oysters and mussels',
    },
    fr: "Troisième lagune de France par sa superficie, l'étang de Thau est le paradis des fruits de mer. Les tables ostréicoles de Bouzigues proposent dégustation d'huîtres et de moules directement sur l'eau. Louez un kayak ou montez à bord d'une barque pour approcher les cabanes de pêcheurs. L'étang est aussi une escale incontournable du Canal du Midi, classé au patrimoine UNESCO.",
    en: 'Oyster and mussel tasting, kayaking',
    tags: ['nature', 'food', 'activities'],
  },
  {
    name: 'Lac du Salagou',
    distance: '45 min',
    tagline: {
      fr: 'Terres rouges, eaux turquoise, vignes',
      en: 'Red earth, turquoise water, vineyards',
    },
    fr: 'Phénomène géologique unique, le Salagou doit sa couleur envoûtante aux terres de ruffes rouges qui l\'entourent. Ses eaux turquoise contrastent avec les collines ocre et les vignes en terrasses. Baignade dans des criques isolées, randonnée sur les sentiers qui longent les rives, et villages abandonnés à explorer comme Celles. Un coucher de soleil sur le lac est inoubliable.',
    en: 'Red lake among vineyards, swimming and hiking',
    tags: ['nature', 'activities'],
  },
  {
    name: 'Cirque de Mourèze',
    distance: '50 min',
    tagline: {
      fr: 'Cathédrale de dolomite à ciel ouvert',
      en: 'Open-air dolomite cathedral',
    },
    fr: 'À couper le souffle : des centaines de pitons rocheux en dolomite sculptés par l\'érosion sur des milliers d\'années, formant un labyrinthe minéral d\'une vingtaine d\'hectares. Un sentier balisé (1h30 de balade) serpente entre les rochers aux formes étranges. Le village médiéval de Mourèze se love au cœur du cirque, dominé par son château en ruines. Idéal en fin de journée pour les lumières dorées.',
    en: 'Spectacular dolomite rock formations',
    tags: ['nature', 'history'],
  },
  {
    name: "St-Guilhem-le-Désert",
    distance: '1h',
    tagline: {
      fr: "Gorges de l'Hérault, abbaye millénaire",
      en: "Hérault gorges, thousand-year-old abbey",
    },
    fr: "Classé parmi les plus beaux villages de France, Saint-Guilhem est un bijou roman niché au fond des gorges de l'Hérault. L'abbaye de Gellone (XIe s.) conserve une relique de la Vraie Croix et un cloître remarquable. Les gorges de l'Hérault invitent à la baignade dans des criques encaissées et à la visite de la grotte de Clamouse, ornée de cristaux et concrétions spectaculaires.",
    en: "One of France's most beautiful villages, Hérault gorges",
    tags: ['nature', 'culture', 'village'],
  },
  {
    name: 'Montpellier',
    distance: '45 min',
    tagline: {
      fr: 'Métropole solaire, vivante et étudiante',
      en: 'Sun-drenched, vibrant university city',
    },
    fr: 'Huitième ville de France et capitale régionale débordante d\'énergie, Montpellier séduit par son mélange d\'architecture médiévale et d\'audace contemporaine. La Place de la Comédie et le Vieux Montpellier invitent à la flânerie, tandis que le musée Fabre abrite l\'une des plus belles collections de peintures flamandes et françaises du sud. En été, les terrasses, concerts et marchés nocturnes animent la ville jusqu\'au petit matin.',
    en: 'Vibrant city, 45 min by car',
    tags: ['city', 'culture'],
  },
  {
    name: 'Béziers',
    distance: '30 min',
    tagline: {
      fr: 'Canal du Midi, arènes et art de vivre',
      en: 'Canal du Midi, bullring and southern lifestyle',
    },
    fr: 'Dominant l\'Orb de sa cathédrale fortifiée, Béziers est une ville de caractère fière de ses racines occitanes. Les 9 écluses de Fonseranes, chef-d\'œuvre du Canal du Midi classé UNESCO, sont un spectacle à ne pas manquer. En août, les férias transforment la ville en une immense fête populaire. Béziers est aussi la capitale du rugby languedocien et d\'une gastronomie généreuse autour des vins de la région.',
    en: 'Canal du Midi, bullring, Languedoc lifestyle',
    tags: ['culture', 'history', 'city'],
  },
  {
    name: 'Narbonne',
    distance: '45 min',
    tagline: {
      fr: "Deux millénaires d'histoire romaine",
      en: 'Two millennia of Roman history',
    },
    fr: 'Ancienne capitale de la Gaule Narbonnaise, Narbonne superpose deux mille ans d\'histoire. La cathédrale Saint-Just, inachevée mais majestueuse, et le palais des Archevêques dominent la ville. Le marché couvert des Halles déborde de produits régionaux : huîtres de Leucate, fromages, charcuteries et vins corbières. La Via Domitia, première voie romaine de Gaule, est visible en plein cœur de la ville.',
    en: 'Roman city, cathedral, covered market',
    tags: ['culture', 'history', 'city'],
  },
];
