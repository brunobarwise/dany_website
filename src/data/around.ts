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
    fr: "Pézenas est une ville Renaissance remarquablement préservée qui fut le siège des États généraux du Languedoc et qui a notamment accueilli Molière, qui y trouva l'inspiration pour ses comédies dans les années 1650. Son dédale de ruelles médiévales, ses majestueux hôtels particuliers et son commerce d'antiquités florissant en font l'une des petites villes les plus riches en histoire du sud de la France.",
    en: 'Pézenas is a remarkably preserved Renaissance town that served as the seat of the Estates-General of Languedoc and famously hosted Molière, who drew inspiration for his comedies here in the 1650s. Its labyrinth of medieval lanes, grand hôtels particuliers, and thriving antique trade make it one of southern France\'s most historically layered small towns.',
    tags: ['culture', 'village', 'history'],
  },
  {
    name: 'Portiragnes-Plage & Serignan-Plage',
    distance: '30 min',
    tagline: {
      fr: 'Plages naturelles, ambiance familiale',
      en: 'Natural beaches, family atmosphere',
    },
    fr: 'S\'étendant le long du littoral de l\'Hérault, les plages de sable de Portiragnes-Plage et de Sérignan-Plage offrent l\'un des tronçons de côte méditerranéenne les plus préservés du Languedoc, bordé de lagunes, de réserves naturelles et d\'une garrigue parfumée, loin des fronts de mer surdéveloppés. Discretes et familiales, elles incarnent le caractère paisible de cette partie de la côte : des plages longues et larges, des eaux chaudes et peu profondes, ainsi qu\'un accès facile aux pistes cyclables et aux sentiers de randonnée régionaux qui sillonnent les zones humides environnantes. Canoë entre l\'Orb et la mer pour une belle aventure avec la compagnie Bayou Canöe.',
    en: 'Stretching along the Hérault coastline, the sandy beaches of Portiragnes-Plage and Sérignan-Plage offer some of the Languedoc\'s most unspoiled Mediterranean shoreline, backed by lagoons, nature reserves, and fragrant garrigue rather than overdeveloped seafronts. Low-key and family-oriented, they embody the unhurried character of this stretch of coast — long, wide beaches, warm shallow waters, and easy access to the regional cycling and walking trails that thread through the surrounding wetlands.',
    tags: ['sea', 'nature', 'family'],
  },
  {
    name: 'Étang de Thau',
    distance: '25 min',
    tagline: {
      fr: 'Le royaume des huîtres et des moules',
      en: 'Kingdom of oysters and mussels',
    },
    fr: "S'étendant sur 20 kilomètres entre Sète et Agde, l'Étang de Thau est la plus grande lagune de la côte méditerranéenne française ; ses eaux calmes sont réputées pour la production de certaines des meilleures huîtres et moules du pays, élevées sur des tables en bois qui parsèment la surface en rangées bien ordonnées. Entouré de marais salants, de vignobles et du Canal du Midi, classé au patrimoine mondial de l’UNESCO, c’est autant un paysage de travail qu’un paysage naturel — un lieu où des villages de pêcheurs comme Bouzigues et Mèze ont entièrement bâti leur identité autour de l’eau.",
    en: 'Stretching 20 kilometres between Sète and Agde, the Étang de Thau is the largest lagoon on the French Mediterranean coast, its still waters famous for producing some of France\'s finest oysters and mussels, farmed on wooden tables that dot the surface in neat rows. Flanked by salt flats, vineyards, and the UNESCO-listed Canal du Midi, it is as much a working landscape as a natural one - a place where fishing villages like Bouzigues and Mèze have built their identity entirely around the water.',
    tags: ['nature', 'food', 'activities'],
  },
  {
    name: 'Lac du Salagou',
    distance: '45 min',
    tagline: {
      fr: 'Terres rouges, eaux turquoise, vignes',
      en: 'Red earth, turquoise water, vineyards',
    },
    fr: 'Niché au cœur d’un paysage volcanique aux reliefs rouge rouille unique en France, le lac du Salagou est un réservoir d’une beauté saisissante, presque surnaturelle : ses eaux d’un bleu profond se détachent sur des falaises ocres et d’anciennes collines de basalte qui attirent depuis des décennies géologues, artistes et randonneurs. Au-delà de la baignade et de la voile, le lac se trouve au cœur d’un espace naturel protégé riche en sentiers de randonnée, en sites préhistoriques et en ruines empreintes d’une mélancolie tranquille : celles du village de Celles, partiellement submergé et abandonné lors de l’inondation de la vallée en 1969.',
    en: 'Carved into a volcanic landscape of rust-red ruffes unlike anywhere else in France, the Lac du Salagou is a reservoir of striking, almost otherworldly beauty — its deep blue waters set against ochre cliffs and ancient basalt hills that have drawn geologists, artists, and wanderers for decades. Beyond swimming and sailing, the lake sits at the heart of a protected natural area rich in walking trails, prehistoric sites, and the quietly evocative ruins of the partially submerged village of Celles, abandoned when the valley was flooded in 1969.',
    tags: ['nature', 'activities', 'family'],
  },
  {
    name: 'Cirque de Mourèze',
    distance: '50 min',
    tagline: {
      fr: 'Cathédrale de dolomite à ciel ouvert',
      en: 'Open-air dolomite cathedral',
    },
    fr: 'Véritable amphithéâtre naturel formé de tours de dolomite sculptées par des millénaires d\'érosion, le Cirque de Mourèze est l\'un des paysages les plus spectaculaires du Languedoc : un labyrinthe de formations rocheuses fantomatiques qui encercle un village médiéval semblant s\'élever naturellement de la pierre elle-même. Suffisamment compact pour être exploré à pied en un après-midi, c\'est un lieu empreint d\'une grandeur tranquille et préhistorique.',
    en: 'A natural amphitheatre of dolomite towers sculpted by millennia of erosion, the Cirque de Mourèze is one of Languedoc\'s most dramatic landscapes — a labyrinth of ghostly rock formations encircling a medieval village that seems to grow organically from the stone itself. Compact enough to explore on foot in an afternoon, it is a place of quiet, prehistoric grandeur.',
    tags: ['nature', 'history', 'family'],
  },
  {
    name: "St-Guilhem-le-Désert",
    distance: '1h',
    tagline: {
      fr: "Gorges de l'Hérault, abbaye millénaire",
      en: "Hérault gorges, thousand-year-old abbey",
    },
    fr: "Accroché aux parois des spectaculaires Gorges de l'Hérault, Saint-Guilhem-le-Désert est un village médiéval classé au patrimoine mondial de l'UNESCO, construit autour d'une abbaye bénédictine fondée en 804 par Guillaume de Gellone, compagnon de Charlemagne. L'une des étapes majeures du chemin de pèlerinage vers Saint-Jacques-de-Compostelle, il est resté remarquablement intact : un village de pierre dorée, de ruelles voûtées et de splendeur romane, niché entre la rivière et la falaise.",
    en: "Clinging to the walls of the dramatic Gorges de l'Hérault, Saint-Guilhem-le-Désert is a UNESCO-listed medieval village built around a Benedictine abbey founded in 804 by Charlemagne's companion Guillaume de Gellone. One of the great stops on the pilgrimage route to Santiago de Compostela, it remains arrestingly intact — a village of golden stone, vaulted lanes, and Romanesque splendour wedged between river and cliff.",
    tags: ['nature', 'culture', 'village'],
  },
  {
    name: 'Montpellier',
    distance: '45 min',
    tagline: {
      fr: 'Métropole solaire, vivante et étudiante',
      en: 'Sun-drenched, vibrant university city',
    },
    fr: 'Ville dynamique et ensoleillée, idéalement située entre mer et garrigue, Montpellier allie un centre médiéval magnifiquement préservé et la Place de la Comédie, très animée, à des musées de renommée mondiale, une scène gastronomique en effervescence et des liaisons faciles en tramway vers les plages de Palavas. La ville française qui connaît la plus forte croissance dégage une énergie contagieuse et jeune qui rend sa découverte tout aussi enrichissante que son utilisation comme point de départ pour explorer l\'Hérault dans son ensemble.',
    en: 'A vibrant, sun-drenched city perfectly placed between sea and garrigue, Montpellier pairs a beautifully preserved medieval centre and lively Place de la Comédie with world-class museums, a buzzing restaurant scene, and easy tram connections to the beaches of Palavas. France\'s fastest-growing city has an infectious, youthful energy that makes it as rewarding to wander as it is to use as a base for exploring the wider Hérault.',
    tags: ['city', 'culture'],
  },
  {
    name: 'Béziers',
    distance: '30 min',
    tagline: {
      fr: 'Canal du Midi, arènes et art de vivre',
      en: 'Canal du Midi, bullring and southern lifestyle',
    },
    fr: 'Perchée de manière spectaculaire au-dessus de l\'Orb, Béziers offre à ses visiteurs des vues imprenables, une magnifique cathédrale au sommet d\'une colline et, à proximité, la merveille d\'ingénierie que sont les Écluses de Fonserannes — neuf écluses en escalier sur le Canal du Midi, classé au patrimoine mondial de l\'UNESCO, qui comptent parmi les sites les plus photographiés du sud de la France. Deux fois par an, sa célèbre feria transforme la ville en une explosion de musique, de couleurs et de festivités qui attire des visiteurs de toute l’Europe.',
    en: 'Perched dramatically above the Orb river, Béziers rewards visitors with sweeping views, a magnificent hilltop cathedral, and the nearby engineering marvel of the Écluses de Fonserannes — nine staircase locks on the UNESCO-listed Canal du Midi that are among the most photographed sights in southern France. Twice a year its famous feria transforms the city into a riot of music, colour, and celebration that draws visitors from across Europe.',
    tags: ['culture', 'history', 'city'],
  },
  {
    name: 'Narbonne',
    distance: '45 min',
    tagline: {
      fr: "Deux millénaires d'histoire romaine",
      en: 'Two millennia of Roman history',
    },
    fr: 'Avec un canal classé au patrimoine mondial de l’UNESCO qui traverse son marché couvert animé, des vestiges romains disséminés dans le centre-ville et une cathédrale gothique inachevée qui s’élève vers le ciel, Narbonne offre une visite remarquablement riche pour une ville de cette taille. Sa situation entre la région viticole des Corbières, l’Étang de Bages sauvage et les plages de Narbonne-Plage en fait un point de départ idéal, et souvent sous-estimé, pour explorer l’Aude.',
    en: 'With a UNESCO-listed canal running through its bustling covered market, Roman remains scattered across the city centre, and a soaring unfinished Gothic cathedral, Narbonne offers a remarkably rich visit for a city of its size. Its position between the Corbières wine country, the wild Étang de Bages, and the beaches of Narbonne-Plage makes it an ideal and often underrated base for exploring the Aude.',
    tags: ['culture', 'history', 'city'],
  },
];
