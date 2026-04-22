export type GallerySection = {
  key: string;
  fr: string;
  en: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  altEn: string;
  section: string;
};

export const sections: GallerySection[] = [
  { key: 'sejour',          fr: 'Séjour',              en: 'Living room'      },
  { key: 'cuisine-entree',  fr: 'Cuisine et entrée',   en: 'Kitchen & entrance' },
  { key: 'loggia',          fr: 'Loggia',               en: 'Loggia'           },
  { key: 'chambre',         fr: 'Chambre',              en: 'Bedroom'          },
  { key: 'cuisine',         fr: 'Cuisine',              en: 'Kitchen'          },
  { key: 'residence',       fr: 'La résidence',         en: 'The residence'    },
  { key: 'port',            fr: 'Le Port',              en: 'The harbour'      },
  { key: 'commerces',       fr: 'Commerces',            en: 'Local shops'      },
  { key: 'plages',          fr: 'Les plages & la mer',  en: 'Beaches & the sea' },
];

export const images: GalleryImage[] = [
  { src: '/images/gallery/01.webp', alt: 'Salle à manger avec accès à la loggia et vue sur le jardin',                  altEn: 'Dining area with loggia and garden view',                          section: 'sejour'         },
  { src: '/images/gallery/02.webp', alt: 'Cuisine ouverte sur le séjour',                                               altEn: 'Open-plan kitchen and living room',                                section: 'cuisine-entree' },
  { src: '/images/gallery/03.webp', alt: 'Loggia avec table de petit-déjeuner, vue sur le jardin',                      altEn: 'Loggia breakfast table with garden view',                          section: 'loggia'         },
  { src: '/images/gallery/04.webp', alt: 'Chambre double au nord dans résidence au calme pour un repos serein',         altEn: 'Quiet north-facing double bedroom with two bedside lamps',         section: 'chambre'        },
  { src: '/images/gallery/05.webp', alt: 'Cuisine et Salle de bain fonctionnelles',                                     altEn: 'Fully equipped and functionnal kitchen and bathroom',              section: 'cuisine'        },
  { src: '/images/gallery/06.webp', alt: 'La résidence entourée de verdure, avec parking privé et sécurisé',            altEn: 'The residence surrounded by gardens, with private parking',        section: 'residence'      },
  { src: '/images/gallery/07.webp', alt: 'Le port de plaisance du Cap d\'Agde et ses nombreux restaurants et cafés',    altEn: 'Cap d\'Agde marina and its sailing boats',                         section: 'port'           },
  { src: '/images/gallery/08.webp', alt: 'Boulangerie, boucherie, traiteur et tous commerces à proximité',              altEn: 'Bakery, butcher, deli and shops a short walk away',                section: 'commerces'      },
  { src: '/images/gallery/09.webp', alt: "Fleurs sauvages au bord de l'embouchure de l'Hérault",                        altEn: 'Wildflowers by the Hérault estuary',                               section: 'port'           },
  { src: '/images/gallery/10.webp', alt: 'Dunes de sable fin et mer turquoise au Cap d\'Agde',                          altEn: 'Sand dunes and turquoise sea at Cap d\'Agde',                      section: 'plages'         },
  { src: '/images/gallery/11.webp', alt: 'Coucher de soleil sur la plage du Cap d\'Agde',                               altEn: 'Sunset over the beach at Cap d\'Agde',                             section: 'plages'         },
  { src: '/images/gallery/12.webp', alt: 'Crique rocheuse sous un ciel d\'orage, goélands au premier plan',             altEn: 'Rocky cove under a stormy sky, seagulls in the foreground',        section: 'plages'         },
  { src: '/images/gallery/13.webp', alt: 'Pêche en famille et cerfs-volants au bord de l\'eau',                         altEn: 'Family fishing and giant kite at the waterside',                   section: 'plages'         },
  { src: '/images/gallery/14.webp', alt: 'Arc-en-ciel sur la mer turquoise et la digue',                                altEn: 'Rainbow over the turquoise sea and stone breakwater',              section: 'plages'         },
  { src: '/images/gallery/15.webp', alt: 'Palmiers en silhouette sur la grande plage au coucher du soleil',             altEn: 'Palm trees silhouetted against the sunset on the main beach',      section: 'plages'         },
];
