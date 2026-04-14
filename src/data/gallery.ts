export type GallerySection = {
  key: string;
  fr: string;
  en: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
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
  { src: '/images/gallery/01.webp', alt: 'Vue depuis la cuisine',                          section: 'sejour'         },
  { src: '/images/gallery/02.webp', alt: 'Vue depuis le salon',                             section: 'cuisine-entree' },
  { src: '/images/gallery/03.webp', alt: 'Pour prendre les repas au calme',                 section: 'loggia'         },
  { src: '/images/gallery/04.webp', alt: 'Résidence au calme pour un repos serein',         section: 'chambre'        },
  { src: '/images/gallery/05.webp', alt: 'Équipée et fonctionnelle',                        section: 'cuisine'        },
  { src: '/images/gallery/06.webp', alt: 'Au calme, parking privé et sécurisé',             section: 'residence'      },
  { src: '/images/gallery/07.webp', alt: 'Ses nombreux restaurants et cafés',               section: 'port'           },
  { src: '/images/gallery/08.webp', alt: 'Tous commerces à proximité',                      section: 'commerces'      },
  { src: '/images/gallery/09.webp', alt: "Balade le long de l'embouchure de l'Hérault",     section: 'port'           },
  { src: '/images/gallery/10.webp', alt: 'Les plages du Cap d\'Agde',                       section: 'plages'         },
  { src: '/images/gallery/11.webp', alt: 'Les plages du Cap d\'Agde',                       section: 'plages'         },
  { src: '/images/gallery/12.webp', alt: 'Les plages du Cap d\'Agde',                       section: 'plages'         },
  { src: '/images/gallery/13.webp', alt: 'Les plages du Cap d\'Agde',                       section: 'plages'         },
  { src: '/images/gallery/14.webp', alt: 'Les plages du Cap d\'Agde',                       section: 'plages'         },
  { src: '/images/gallery/15.webp', alt: 'Les plages du Cap d\'Agde',                       section: 'plages'         },
];
