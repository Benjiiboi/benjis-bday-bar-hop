export interface Venue {
  id: string;
  name: string;
  address: string;
  position: { x: number; y: number };
  viewport: { x: number; y: number; scale: number };
  color: string;
  hours: string;
  description: string;
  vibe: string;
  signature: string[];
  whyHere: string;
  images: string[];
  walkingTimeToNext?: string;
  order: number;
}

export const venues: Venue[] = [
  {
    id: 'bar-olo',
    name: 'Bar Olo',
    address: '165 Nicholson Street, Carlton',
    position: { x: 22, y: 25 },
    viewport: { x: 15, y: 20, scale: 1.2 },
    color: '#c9a227',
    hours: 'Tue–Thu 4pm–12am, Fri–Sat 4pm–1am',
    description: 'An intimate Italian-leaning bar from the team behind Scopri. Small, elegant, and seriously sophisticated.',
    vibe: 'Refined European elegance. Curtain-lined entrance, warm timber, impeccable cocktails.',
    signature: ['Negroni', 'Boulevardier', 'Oxtail Ragu', 'Italian Wine'],
    whyHere: 'The perfect opener. Start here for a civilized dinner with cocktails that set the tone for the night.',
    images: ['https://media.timeout.com/images/106233356/750/422/image.jpg'],
    walkingTimeToNext: '15 min walk',
    order: 1
  },
  {
    id: 'shady-lady',
    name: 'Shady Lady',
    address: '36 Johnston Street, Fitzroy',
    position: { x: 75, y: 18 },
    viewport: { x: 65, y: 10, scale: 1.3 },
    color: '#6c5ce7',
    hours: 'Nightly until late',
    description: 'An outrageously kitsch dive bar with a strict no-dickhead policy. Time Out Best Bar Team 2020.',
    vibe: 'Fabulous chaos. Tasseled lampshades, teal walls, disco balls, frozen drinks, unpretentious fun.',
    signature: ['Frozen Piña Colada', '$5 Nachos', 'Frozen Margaritas', 'Karaoke Nights'],
    whyHere: 'Early energy! Get the party started with frozen cocktails and kitsch vibes.',
    images: ['https://media.timeout.com/images/105165006/750/422/image.jpg'],
    walkingTimeToNext: '8 min walk',
    order: 2
  },
  {
    id: 'pendant',
    name: 'Pendant Public Bar',
    address: '334 Brunswick Street, Fitzroy',
    position: { x: 65, y: 35 },
    viewport: { x: 55, y: 30, scale: 1.2 },
    color: '#8b4513',
    hours: 'Wed–Mon 4pm–late (Happy Hour 4–6pm)',
    description: 'Everleigh alumni bring an old Irish pub meets New Orleans cocktail den. Dog-friendly, unpretentious, excellent drinks.',
    vibe: 'Neighbourhood pub warmth with cocktail bar precision. Exposed brick, warm lighting, convivial energy.',
    signature: ['$10 Pints (Happy Hour)', 'Guinness on Tap', 'Classic Cocktails', 'Samboy Chips'],
    whyHere: 'The transition spot. No food (just chips), so come thirsty for that legendary $10 pint happy hour.',
    images: ['https://cdn.broadsheet.com.au/cache/19/c6/19c6155f084e2fbc63e9920b733f21a7.webp'],
    walkingTimeToNext: '4 min walk',
    order: 3
  },
  {
    id: 'black-cat',
    name: 'Black Cat',
    address: '252 Brunswick Street, Fitzroy',
    position: { x: 58, y: 48 },
    viewport: { x: 50, y: 42, scale: 1.2 },
    color: '#2d3436',
    hours: 'Cafe by day, DJ bar by night (Busy by 7:30pm)',
    description: 'A 30+ year Brunswick Street institution. The beating heart of Fitzroy alternative culture.',
    vibe: 'Bohemian living room. Retro couches, beer garden, book-reading types by day, DJs by night.',
    signature: ['Beer Garden', 'DJ Sets', 'Nuclear Alaska Sundae', 'Local Brews'],
    whyHere: 'The social anchor. Casual, lively, and always interesting. Grab a spot in the beer garden if you can.',
    images: ['https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/eb/34/4c/photo0jpg.jpg?w=900&h=500&s=1'],
    walkingTimeToNext: '5 min walk',
    order: 4
  },
  {
    id: 'amarillo',
    name: 'Amarillo',
    address: '149 Brunswick Street, Fitzroy',
    position: { x: 48, y: 62 },
    viewport: { x: 40, y: 55, scale: 1.2 },
    color: '#e17055',
    hours: 'Daily, Happy Hour open–7pm',
    description: 'Golden-hued European wine bar with Iberian Peninsula influences. Spanish-ish, sophisticated, delicious.',
    vibe: 'Warm and convivial. Golden lighting, natural wine focus, shared plates, intimate tables.',
    signature: ['Charred Cauliflower', 'Natural Wine', 'Tapas', 'Happy Hour Drinks'],
    whyHere: 'A refresh point. Lighter bites and excellent wine to recalibrate before the late-night push.',
    images: ['https://cdn.broadsheet.com.au/cache/93/f7/93f72fe68d3ad4af8f97faa5f13f02a9.webp'],
    walkingTimeToNext: '6 min walk',
    order: 5
  },
  {
    id: 'moondrop',
    name: 'Moondrop',
    address: 'Upstairs at 150 Gertrude Street, Fitzroy',
    position: { x: 35, y: 75 },
    viewport: { x: 28, y: 68, scale: 1.3 },
    color: '#d63031',
    hours: 'Wed–Sun, evenings',
    description: '1920s Shanghai glamour in the former Everleigh space. Chinese-inspired cocktails from the Sleepy team.',
    vibe: 'Mysterious and seductive. Low-lit, lantern-lit, jade and crimson accents, intimate booths.',
    signature: ['Sichuan Slipper', 'Me & Ube (Boba)', 'Chinese Bar Snacks', 'Lunar New Year Cocktails'],
    whyHere: 'The exotic finale. Ascend upstairs for something completely different—elevated cocktails with Asian flavors.',
    images: ['https://media.timeout.com/images/106384438/750/422/image.jpg'],
    order: 6
  }
];
