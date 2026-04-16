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
  { icon: '🛒', fr: 'Tous commerces à proximité', en: 'All shops close by' },
  { icon: '🥖', fr: 'Marché traditionnel le samedi matin', en: 'Traditional market on Saturday mornings' },
  { icon: '🚴', fr: 'Pistes cyclables tout autour', en: 'Cycling paths all around' },
  { icon: '⛳', fr: "Golf, tennis, terrain d'aventures", en: 'Golf, tennis, adventure park' },
  { icon: '⚓️', fr: "Canal du Midi", en: 'Canal du Midi' },
  { icon: '🏛️', fr: "Château Laurens", en: 'Laurens Castle' },
  { icon: '🎡', fr: "Luna Park et Aqualand", en: 'Luna Park & Aqualand' },
  { icon: '🎰', fr: "Casino Barrière Cap d\'Agde", en: 'Casino Barrière Cap d\'Agde' },

];

export const region: BilingualPlace[] = [
  {
    name: 'Sète',
    distance: '25 min',
    tagline: {
      fr: "L'île singulière, cité de Brassens",
      en: "The singular island, city of Brassens",
    },
    fr: "Posée sur un rocher entre la mer et l’étang de Thau, Sète s’est construite autour de ses canaux et de ses quais de pêche. Le marché des Halles mérite à lui seul le détour - tielles épicées, fromages de brebis, vins de Picpoul. Montez jusqu’au Cimetière Marin pour la vue et pour voir où est enterré Brassens. En été, les joutes nautiques sur le canal animent la ville entière.",
    en: "Sète sits on a narrow strip of land between the sea and the Étang de Thau, built around its canals and fishing quays. The covered market at Les Halles is worth the trip alone - tielles (spiced octopus pastries), sheep’s cheese, Picpoul wine. Walk up to the Cimetière Marin for the view and to see where Brassens is buried. Come in summer and the water jousting on the canal takes over the whole city.",
    tags: ['sea', 'culture', 'food'],
  },
  {
    name: 'Pézenas',
    distance: '30 min',
    tagline: {
      fr: 'Ville de Molière, cœur médiéval préservé',
      en: "Molière's city, preserved medieval heart",
    },
    fr: "Pézenas a servi de capitale du Languedoc au XVIIe siècle, ce qui lui a laissé un centre-ville d'hôtels particuliers et de ruelles pavées que Molière a arpentées dans les années 1650. Aujourd'hui c'est surtout une ville de brocanteurs et d'antiquaires, avec quelques bonnes tables et une atmosphère paisible.",
    en: "Pézenas served as the Languedoc's administrative capital in the 17th century, which left it with a centre full of grand townhouses and cobbled lanes that Molière wandered in the 1650s. These days it's mostly a town of antique dealers and brocantes, with a few good restaurants and a very quiet atmosphere before the day-trippers arrive.",
    tags: ['culture', 'village', 'history'],
  },
  {
    name: 'Portiragnes-Plage & Serignan-Plage',
    distance: '30 min',
    tagline: {
      fr: 'Plages naturelles, ambiance familiale',
      en: 'Natural beaches, family atmosphere',
    },
    fr: "L'un des tronçons de côte méditerranéenne les plus préservés du Languedoc : des plages longues et peu fréquentées, bordées de dunes, de lagunes et de garrigue plutôt que de béton. L'eau est chaude et peu profonde, bien pour les enfants. Depuis Sérignan, la compagnie Bayou Canoë propose des descentes en canoë entre l'Orb et la mer.",
    en: "One of the most unspoiled stretches of Mediterranean coastline in the Languedoc - long, uncrowded beaches backed by dunes, lagoons and garrigue rather than concrete. The water is warm and shallow, good for kids. From Sérignan, Bayou Canoë runs canoe trips down the Orb to the sea.",
    tags: ['sea', 'nature', 'family'],
  },
  {
    name: 'Étang de Thau',
    distance: '25 min',
    tagline: {
      fr: 'Le royaume des huîtres et des moules',
      en: 'Kingdom of oysters and mussels',
    },
    fr: "Entre Sète et Agde, l’Étang de Thau s’étend sur 20 kilomètres - la plus grande lagune du littoral méditerranéen français. Ses eaux calmes sont couvertes de tables ostréicoles sur lesquelles sont élevées huîtres et moules, visibles depuis la rive. À Bouzigues ou Mèze, on peut les déguster face à l’eau, accompagnées d’un picpoul local.",
    en: "Between Sète and Agde, the Étang de Thau stretches 20 kilometres - the largest lagoon on the French Mediterranean coast. Its still waters are covered in oyster and mussel farming tables, visible from the shore. At Bouzigues or Mèze, you can eat them looking out over the water with a glass of local Picpoul.",
    tags: ['nature', 'food', 'activities'],
  },
  {
    name: 'Lac du Salagou',
    distance: '45 min',
    tagline: {
      fr: 'Terres rouges, eaux turquoise, vignes',
      en: 'Red earth, turquoise water, vineyards',
    },
    fr: "Un réservoir entouré de terres rouge rouille - les ruffes, une roche volcanique qu’on ne trouve pratiquement nulle part ailleurs en France. L’eau est bleue, les falaises ocres, et le contraste est saisissant. On vient pour se baigner, faire du vélo ou randonner, mais aussi pour voir les ruines du village de Celles, partiellement submergé quand la vallée a été inondée en 1969.",
    en: "A reservoir ringed by rust-red ruffes - a volcanic rock found almost nowhere else in France. The water is blue, the cliffs ochre, and the contrast is striking. People come to swim, cycle or walk, but also to see the ruins of the village of Celles, partially submerged when the valley was flooded in 1969.",
    tags: ['nature', 'activities', 'family'],
  },
  {
    name: 'Cirque de Mourèze',
    distance: '50 min',
    tagline: {
      fr: 'Cathédrale de dolomite à ciel ouvert',
      en: 'Open-air dolomite cathedral',
    },
    fr: "L'un des paysages les plus spectaculaires du Languedoc : un cirque de tours de dolomite érodées qui encercle un petit village médiéval perché au milieu des rochers. On peut en faire le tour à pied en un après-midi, et les plus courageux trouveront des sentiers plus longs dans les hauteurs.",
    en: "One of the most spectacular landscapes in the Languedoc - a cirque of eroded dolomite towers encircling a small medieval village perched among the rocks. You can walk around the whole site in an afternoon, and there are longer trails in the hills above for those who want more.",
    tags: ['nature', 'history', 'family'],
  },
  {
    name: "St-Guilhem-le-Désert",
    distance: '1h',
    tagline: {
      fr: "Gorges de l'Hérault, abbaye millénaire",
      en: "Hérault gorges, thousand-year-old abbey",
    },
    fr: "Accroché aux parois des Gorges de l'Hérault, Saint-Guilhem est construit autour d'une abbaye bénédictine fondée en 804 par Guillaume de Gellone, compagnon de Charlemagne, et étape historique sur le chemin de Saint-Jacques-de-Compostelle. Le village a peu changé depuis : pierre dorée, ruelles étroites, et la rivière en contrebas. Prévoir la baignade dans l'Hérault au retour.",
    en: "Wedged into the walls of the Gorges de l'Hérault, Saint-Guilhem is built around a Benedictine abbey founded in 804 by Guillaume de Gellone, Charlemagne's companion, and a historic stop on the pilgrimage route to Santiago de Compostela. The village has changed little since - golden stone, narrow lanes, the river below. Factor in a swim in the Hérault on the way back.",
    tags: ['nature', 'culture', 'village'],
  },
  {
    name: 'Montpellier',
    distance: '45 min',
    tagline: {
      fr: 'Métropole solaire, vivante et étudiante',
      en: 'Sun-drenched, vibrant university city',
    },
    fr: "L'une des plus anciennes villes universitaires du monde, Montpellier se déploie entre mer et garrigue avec un vieux centre dense et animé, une Place de la Comédie incontournable, et des musées sérieux - le Musée Fabre en tête. Le tramway rejoint les plages de Palavas en une demi-heure, ce qui en fait aussi une bonne base pour une journée à la mer sans voiture.",
    en: "One of the oldest university towns in the world, Montpellier sits between sea and garrigue with a dense, lively old centre, an unmissable Place de la Comédie, and serious museums - the Musée Fabre chief among them. The tram reaches the beaches of Palavas in half an hour, making it a good base for a car-free day at the sea.",
    tags: ['city', 'culture'],
  },
  {
    name: 'Béziers',
    distance: '30 min',
    tagline: {
      fr: 'Canal du Midi, arènes et art de vivre',
      en: 'Canal du Midi, bullring and southern lifestyle',
    },
    fr: "Perchée au-dessus de l’Orb, Béziers a une cathédrale au sommet d’une colline et, à quelques kilomètres, les Écluses de Fonserannes - neuf écluses en escalier sur le Canal du Midi qui valent à elles seules le déplacement. Deux fois par an, la feria prend possession de toute la ville pendant plusieurs jours.",
    en: "Perched above the Orb, Béziers has a hilltop cathedral and, a few kilometres out, the Écluses de Fonserannes - nine staircase locks on the Canal du Midi that are worth the trip on their own. Twice a year the feria takes over the entire city for several days.",
    tags: ['culture', 'history', 'city'],
  },
  {
    name: 'Narbonne',
    distance: '45 min',
    tagline: {
      fr: "Deux millénaires d'histoire romaine",
      en: 'Two millennia of Roman history',
    },
    fr: "Le marché couvert de Narbonne longe le Canal de la Robine - beau point de départ pour explorer le centre-ville, parsemé de vestiges romains et dominé par une cathédrale gothique inachevée depuis le XIIIe siècle. Une bonne journée en perspective, avec les caves des Corbières à portée de route - et le pays catalan qui commence juste derrière.",
    en: "Narbonne’s covered market runs alongside the Canal de la Robine - a good starting point for a city centre scattered with Roman remains and dominated by an unfinished Gothic cathedral since the 13th century. A full day out, with the wine caves of the Corbières within easy reach - and Catalan country starting just beyond.",
    tags: ['culture', 'history', 'city'],
  },
];
