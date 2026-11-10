export type SiteRoute =
  | { page: 'home' }
  | { page: 'collection'; category: 'kitchen' | 'wardrobe' | 'vanity' }
  | { page: 'project'; projectId: string }
  | { page: 'about' }
  | { page: 'contact'; scrollToLine?: boolean };

export type DesignStyle = 'Minimalist' | 'Classical' | 'Luxurious';

export interface ProjectCardItem {
  id: string;
  category: 'kitchen' | 'wardrobe' | 'vanity';
  title: string;
  projectCode: string;
  style: DesignStyle;
  image: string;
  gallery: string[];
}

export const SITE_CONTACT = {
  phoneDisplay: '+64 (0) 9 2711 983',
  phoneShort: '+ 9 2711 983',
  phoneHref: 'tel:+6492711983',
  email: 'info@supremekitchen.co.nz',
  address: '6 Highbrook Drive, East Tāmaki, Auckland',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.172099882893!2d174.88084437669897!3d-36.9383885845198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d4c7182ce3227%3A0xa4f4ab0337e4945!2s6%20Highbrook%20Drive%2C%20East%20T%C4%81maki%2C%20Auckland%202013!5e1!3m2!1sen!2snz!4v1737614191802!5m2!1sen!2snz',
};

export const COLLECTION_CARDS: {
  category: 'kitchen' | 'wardrobe' | 'vanity';
  line1: string;
  line2: string;
  image: string;
  defaultStyle: DesignStyle;
}[] = [
  {
    category: 'kitchen',
    line1: 'Kitchen',
    line2: 'Collection',
    image: '/site-assets/col-kitchen.png',
    defaultStyle: 'Minimalist',
  },
  {
    category: 'wardrobe',
    line1: 'Wardrobe',
    line2: 'Collection',
    image: '/site-assets/col-wardrobe.png',
    defaultStyle: 'Classical',
  },
  {
    category: 'vanity',
    line1: 'Vanity',
    line2: 'Collection',
    image: '/site-assets/col-vanity.png',
    defaultStyle: 'Luxurious',
  },
];

export const HOME_SERVICES = [
  {
    icon: '/site-assets/svc-consultation.png',
    title: 'Personalised Consultation',
    lines: ['Book a personalized', 'consultation to bring your', 'kitchen vision to life.'],
  },
  {
    icon: '/site-assets/svc-style.png',
    title: 'Choose Your Style',
    lines: ['Discover the perfect style', 'that aligns with your taste', 'and needs.'],
  },
  {
    icon: '/site-assets/svc-install.png',
    title: 'Precision Installation',
    lines: ['Our expert team handles', 'precise cabinet installation', 'for a flawless finish.'],
  },
  {
    icon: '/site-assets/svc-cleanup.png',
    title: 'Final Clean-Up',
    lines: ['Enjoy a spotless kitchen', 'with our dedicated cabinet', 'clean-up service.'],
  },
];

export const HOME_DESIGN_PROJECTS = [
  { id: 'w-01', image: '/site-assets/home-proj-1.png', label: 'Wardrobe Showcase' },
  { id: 'v-01', image: '/site-assets/home-proj-2.png', label: 'Vanity Showcase' },
  { id: 'k-05', image: '/site-assets/home-proj-3.png', label: 'Modern Island Kitchen' },
  { id: 'w-07', image: '/site-assets/home-proj-4.png', label: 'Walk-in Wardrobe' },
  { id: 'k-02', image: '/site-assets/home-proj-5.png', label: 'Architectural Kitchen' },
  { id: 'k-01', image: '/site-assets/home-proj-6.png', label: 'Bespoke Timber Kitchen' },
];

export const PARTNER_LOGOS = [
  { src: '/site-assets/partner-1.png', alt: 'Partner Brand 1' },
  { src: '/site-assets/partner-2.png', alt: 'Partner Brand 2' },
  { src: '/site-assets/partner-3.png', alt: 'Impeys NZPG Partner' },
  { src: '/site-assets/partner-4.png', alt: 'Partner Brand 4' },
];

export const WHY_CHOOSE_ITEMS = [
  {
    icon: '/site-assets/why-1.png',
    title: 'Fast Building',
    desc: 'Efficient processes ensure your project is completed on time without compromising quality.',
  },
  {
    icon: '/site-assets/why-2.png',
    title: 'Fast Building',
    desc: 'With expert craftsmanship and attention to detail, every step is executed flawlessly.',
  },
  {
    icon: '/site-assets/why-3.png',
    title: 'Carefully Planned',
    desc: 'Meticulous planning ensures every element aligns with your vision and needs.',
  },
  {
    icon: '/site-assets/why-4.png',
    title: 'Perfect Design',
    desc: 'Our designs balance elegance and functionality, delivering a space that truly inspires.',
  },
];

export const ALL_PROJECTS: ProjectCardItem[] = [
  // Kitchen Collection (13 projects)
  {
    id: 'k-01',
    category: 'kitchen',
    title: 'Project 01',
    projectCode: 'Project#01',
    style: 'Minimalist',
    image: '/site-assets/projects/k-01.png',
    gallery: ['/site-assets/projects/k-01.png', '/site-assets/projects/k-02.jpg', '/site-assets/projects/k-03.jpg'],
  },
  {
    id: 'k-02',
    category: 'kitchen',
    title: 'Project 02',
    projectCode: 'Project#02',
    style: 'Minimalist',
    image: '/site-assets/projects/k-02.jpg',
    gallery: ['/site-assets/projects/k-02.jpg', '/site-assets/projects/k-04.jpg', '/site-assets/projects/k-05.jpg'],
  },
  {
    id: 'k-03',
    category: 'kitchen',
    title: 'Project 03',
    projectCode: 'Project#03',
    style: 'Luxurious',
    image: '/site-assets/projects/k-03.jpg',
    gallery: ['/site-assets/projects/k-03.jpg', '/site-assets/projects/k-06.jpg', '/site-assets/projects/k-07.jpg'],
  },
  {
    id: 'k-04',
    category: 'kitchen',
    title: 'Project 04',
    projectCode: 'Project#04',
    style: 'Minimalist',
    image: '/site-assets/projects/k-04.jpg',
    gallery: ['/site-assets/projects/k-04.jpg', '/site-assets/projects/k-02.jpg', '/site-assets/projects/k-08.jpg'],
  },
  {
    id: 'k-05',
    category: 'kitchen',
    title: 'Project 05',
    projectCode: 'Project#05',
    style: 'Luxurious',
    image: '/site-assets/projects/k-05.jpg',
    gallery: ['/site-assets/projects/k-05.jpg', '/site-assets/projects/k-09.jpg', '/site-assets/projects/k-10.jpg'],
  },
  {
    id: 'k-06',
    category: 'kitchen',
    title: 'Project 06',
    projectCode: 'Project#06',
    style: 'Classical',
    image: '/site-assets/projects/k-06.jpg',
    gallery: ['/site-assets/projects/k-06.jpg', '/site-assets/projects/k-11.jpg', '/site-assets/projects/k-12.jpg'],
  },
  {
    id: 'k-07',
    category: 'kitchen',
    title: 'Project 07',
    projectCode: 'Project#07',
    style: 'Minimalist',
    image: '/site-assets/projects/k-07.jpg',
    gallery: ['/site-assets/projects/k-07.jpg', '/site-assets/projects/k-13.jpg', '/site-assets/projects/k-03.jpg'],
  },
  {
    id: 'k-08',
    category: 'kitchen',
    title: 'Project 08',
    projectCode: 'Project#08',
    style: 'Classical',
    image: '/site-assets/projects/k-08.jpg',
    gallery: ['/site-assets/projects/k-08.jpg', '/site-assets/projects/k-04.jpg', '/site-assets/projects/k-06.jpg'],
  },
  {
    id: 'k-09',
    category: 'kitchen',
    title: 'Project 09',
    projectCode: 'Project#09',
    style: 'Luxurious',
    image: '/site-assets/projects/k-09.jpg',
    gallery: ['/site-assets/projects/k-09.jpg', '/site-assets/projects/k-05.jpg', '/site-assets/projects/k-10.jpg'],
  },
  {
    id: 'k-10',
    category: 'kitchen',
    title: 'Project 10',
    projectCode: 'Project#10',
    style: 'Classical',
    image: '/site-assets/projects/k-10.jpg',
    gallery: ['/site-assets/projects/k-10.jpg', '/site-assets/projects/k-11.jpg', '/site-assets/projects/k-12.jpg'],
  },
  {
    id: 'k-11',
    category: 'kitchen',
    title: 'Project 11',
    projectCode: 'Project#11',
    style: 'Minimalist',
    image: '/site-assets/projects/k-11.jpg',
    gallery: ['/site-assets/projects/k-11.jpg', '/site-assets/projects/k-01.png', '/site-assets/projects/k-02.jpg'],
  },
  {
    id: 'k-12',
    category: 'kitchen',
    title: 'Project 12',
    projectCode: 'Project#12',
    style: 'Luxurious',
    image: '/site-assets/projects/k-12.jpg',
    gallery: ['/site-assets/projects/k-12.jpg', '/site-assets/projects/k-13.jpg', '/site-assets/projects/k-09.jpg'],
  },
  {
    id: 'k-13',
    category: 'kitchen',
    title: 'Project 13',
    projectCode: 'Project#13',
    style: 'Classical',
    image: '/site-assets/projects/k-13.jpg',
    gallery: ['/site-assets/projects/k-13.jpg', '/site-assets/projects/k-07.jpg', '/site-assets/projects/k-08.jpg'],
  },

  // Wardrobe Collection (8 projects)
  {
    id: 'w-01',
    category: 'wardrobe',
    title: 'Project 01',
    projectCode: 'Project#01',
    style: 'Luxurious',
    image: '/site-assets/projects/w-01.jpg',
    gallery: ['/site-assets/projects/w-01.jpg', '/site-assets/projects/w-02.jpg', '/site-assets/projects/w-03.jpg'],
  },
  {
    id: 'w-02',
    category: 'wardrobe',
    title: 'Project 02',
    projectCode: 'Project#02',
    style: 'Minimalist',
    image: '/site-assets/projects/w-02.jpg',
    gallery: ['/site-assets/projects/w-02.jpg', '/site-assets/projects/w-05.jpg', '/site-assets/projects/w-06.jpg'],
  },
  {
    id: 'w-03',
    category: 'wardrobe',
    title: 'Project 03',
    projectCode: 'Project#03',
    style: 'Classical',
    image: '/site-assets/projects/w-03.jpg',
    gallery: ['/site-assets/projects/w-03.jpg', '/site-assets/projects/w-01.jpg', '/site-assets/projects/w-07.jpg'],
  },
  {
    id: 'w-04',
    category: 'wardrobe',
    title: 'Project 04',
    projectCode: 'Project#04',
    style: 'Minimalist',
    image: '/site-assets/projects/w-04.png',
    gallery: ['/site-assets/projects/w-04.png', '/site-assets/projects/w-02.jpg', '/site-assets/projects/w-08.jpg'],
  },
  {
    id: 'w-05',
    category: 'wardrobe',
    title: 'Project 05',
    projectCode: 'Project#05',
    style: 'Classical',
    image: '/site-assets/projects/w-05.jpg',
    gallery: ['/site-assets/projects/w-05.jpg', '/site-assets/projects/w-06.jpg', '/site-assets/projects/w-07.jpg'],
  },
  {
    id: 'w-06',
    category: 'wardrobe',
    title: 'Project 06',
    projectCode: 'Project#06',
    style: 'Luxurious',
    image: '/site-assets/projects/w-06.jpg',
    gallery: ['/site-assets/projects/w-06.jpg', '/site-assets/projects/w-01.jpg', '/site-assets/projects/w-03.jpg'],
  },
  {
    id: 'w-07',
    category: 'wardrobe',
    title: 'Project 07',
    projectCode: 'Project#07',
    style: 'Luxurious',
    image: '/site-assets/projects/w-07.jpg',
    gallery: ['/site-assets/projects/w-07.jpg', '/site-assets/projects/w-08.jpg', '/site-assets/projects/w-02.jpg'],
  },
  {
    id: 'w-08',
    category: 'wardrobe',
    title: 'Project 08',
    projectCode: 'Project#08',
    style: 'Classical',
    image: '/site-assets/projects/w-08.jpg',
    gallery: ['/site-assets/projects/w-08.jpg', '/site-assets/projects/w-05.jpg', '/site-assets/projects/w-06.jpg'],
  },

  // Vanity Collection (9 projects)
  {
    id: 'v-01',
    category: 'vanity',
    title: 'Project 01',
    projectCode: 'Project#01',
    style: 'Minimalist',
    image: '/site-assets/projects/v-01.jpg',
    gallery: ['/site-assets/projects/v-01.jpg', '/site-assets/projects/v-02.jpg', '/site-assets/projects/v-03.jpg'],
  },
  {
    id: 'v-02',
    category: 'vanity',
    title: 'Project 02',
    projectCode: 'Project#02',
    style: 'Minimalist',
    image: '/site-assets/projects/v-02.jpg',
    gallery: ['/site-assets/projects/v-02.jpg', '/site-assets/projects/v-04.jpg', '/site-assets/projects/v-05.jpg'],
  },
  {
    id: 'v-03',
    category: 'vanity',
    title: 'Project 03',
    projectCode: 'Project#03',
    style: 'Luxurious',
    image: '/site-assets/projects/v-03.jpg',
    gallery: ['/site-assets/projects/v-03.jpg', '/site-assets/projects/v-06.png', '/site-assets/projects/v-07.jpg'],
  },
  {
    id: 'v-04',
    category: 'vanity',
    title: 'Project 04',
    projectCode: 'Project#04',
    style: 'Classical',
    image: '/site-assets/projects/v-04.jpg',
    gallery: ['/site-assets/projects/v-04.jpg', '/site-assets/projects/v-08.jpg', '/site-assets/projects/v-09.jpg'],
  },
  {
    id: 'v-05',
    category: 'vanity',
    title: 'Project 05',
    projectCode: 'Project#05',
    style: 'Luxurious',
    image: '/site-assets/projects/v-05.jpg',
    gallery: ['/site-assets/projects/v-05.jpg', '/site-assets/projects/v-01.jpg', '/site-assets/projects/v-03.jpg'],
  },
  {
    id: 'v-06',
    category: 'vanity',
    title: 'Project 06',
    projectCode: 'Project#06',
    style: 'Minimalist',
    image: '/site-assets/projects/v-06.png',
    gallery: ['/site-assets/projects/v-06.png', '/site-assets/projects/v-02.jpg', '/site-assets/projects/v-07.jpg'],
  },
  {
    id: 'v-07',
    category: 'vanity',
    title: 'Project 07',
    projectCode: 'Project#07',
    style: 'Luxurious',
    image: '/site-assets/projects/v-07.jpg',
    gallery: ['/site-assets/projects/v-07.jpg', '/site-assets/projects/v-08.jpg', '/site-assets/projects/v-09.jpg'],
  },
  {
    id: 'v-08',
    category: 'vanity',
    title: 'Project 08',
    projectCode: 'Project#08',
    style: 'Classical',
    image: '/site-assets/projects/v-08.jpg',
    gallery: ['/site-assets/projects/v-08.jpg', '/site-assets/projects/v-04.jpg', '/site-assets/projects/v-05.jpg'],
  },
  {
    id: 'v-09',
    category: 'vanity',
    title: 'Project 09',
    projectCode: 'Project#09',
    style: 'Luxurious',
    image: '/site-assets/projects/v-09.jpg',
    gallery: ['/site-assets/projects/v-09.jpg', '/site-assets/projects/v-03.jpg', '/site-assets/projects/v-07.jpg'],
  },
];
