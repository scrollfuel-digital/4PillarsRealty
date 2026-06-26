import { Project, Blog, Notification } from './types';

export const BRAND_COLORS = {
  primary: '#003B72', // Corporate Deep Blue
  secondary: '#1A67A4', // Royal Blue Accent
  accent: '#C51B1D', // Slogan Crimson Red
  darkBg: '#091522', // High-end dark background
  lightBg: '#F8FAFC', // Slate background for light mode
};

export const PROJECTS: Project[] = [
  {
    id: 'melbourne-city-sector-ii',
    name: 'Melbourne City Sector II',
    slug: 'melbourne-city-sector-ii',
    type: 'plot',
    location: 'Kaldongri, Nagpur',
    description: 'A thoughtfully planned premium residential development spread across 4 acres featuring 71 residential plots. Designed for families and investors seeking long-term growth and peaceful living in Nagpur\'s fastest-growing corridor.',
    details: [
      'Spread across 4 acres of lush greenery',
      'Fully sanctioned by Nagpur Metropolitan Region Development Authority (NMRDA)',
      'A peaceful gated community with premium features',
      'Ready for immediate construction with excellent immediate appreciation prospects'
    ],
    specs: [
      { label: 'Project Area', value: '4 Acres' },
      { label: 'Total Plots', value: '71 Residential Plots' },
      { label: 'Plot Sizes', value: '1,200 - 3,500 Sq. Ft.' },
      { label: 'Bank Loan', value: 'Up to 80% Approved' },
      { label: 'Development Authority', value: 'NMRDA Sanctioned RL' }
    ],
    highlights: [
      '71 Premium Residential Plots',
      '4 Acre Masterplanned Development',
      'Curated Lifestyle Amenities',
      'High-potential Investment Corridor'
    ],
    amenities: [
      'European Style Entrance Gate',
      'Landscaped Gardens',
      'Children\'s Play Area',
      'Jogging Track',
      'Wide Paved Roads',
      'Sewerage Treatment Plant',
      'Underground Electrical Cables',
      'LED Street Lighting'
    ],
    acres: '4',
    totalUnits: '71',
    priceRange: '₹22 Lakh onward',
    image: '/images/project_melbourne_png_1780484693295.png',
    gallery: [
      '/images/project_melbourne_png_1780484693295.png',
      '/images/heroimage.png'
    ],
    coordinate: { x: 38, y: 72 },
    mapHotspot: 'Kaldongri Highway Hub'
  },
  {
    id: 'canberra-city',
    name: 'Canberra City',
    slug: 'canberra-city',
    type: 'plot',
    location: 'Wardha Road Corridor, Nagpur',
    description: 'Spread across 6 premium acres with 97 residential plots, Canberra City combines ultra-modern infrastructure, wide-open spaces, and incredible geographical layout advantages designed for standard custom builds and rapid value elevation.',
    details: [
      '6 acres of perfectly flat, premium elevated topography',
      'Includes open public utility spaces and landscaped parks',
      'Complete concrete/tar roads with direct access to national arterial highways',
      'Water connections directly running to every individual plot boundary'
    ],
    specs: [
      { label: 'Project Area', value: '6 Acres' },
      { label: 'Total Plots', value: '97 Residential Plots' },
      { label: 'Internal Roads', value: '30 & 40 feet wide layout' },
      { label: 'Bank Loan Support', value: 'Up to 80% Assistance' },
      { label: 'Clear Title', value: '100% Fully RL Approved' }
    ],
    highlights: [
      '97 Highly Appreciating Residential Plots',
      '6 Acre Premium Layout Planning',
      'Green Open Spaces & Gazebos',
      'Immediate Electricity Infrastructure'
    ],
    amenities: [
      'European Style Entrance Gate',
      'Lush Landscaped Gazette Parks',
      'Gazebos & Outdoor Seating Blocks',
      'Broad Walking & Jogging Tracks',
      'Wide Drainage & Storm Water Systems',
      'Round-the-clock Security Hub',
      'Avenue Plantations'
    ],
    acres: '6',
    totalUnits: '97',
    priceRange: '₹30 Lakh onward',
    image: '/images/project_canberra_png_1780484709897.png',
    gallery: [
      '/images/project_canberra_png_1780484709897.png',
      '/images/heroimage.png'
    ],
    coordinate: { x: 25, y: 58 },
    mapHotspot: 'Wardha Road Smart Belt'
  },
  {
    id: 'shraddha-bhakti-avenue',
    name: 'Shraddha Bhakti Avenue',
    slug: 'shraddha-bhakti-avenue',
    type: 'apartment',
    location: 'Besa, Nagpur',
    description: 'Experience premium luxury living with spacious 3 BHK boutique residences designed for modern elite families seeking ultimate privacy, supreme ventilation, premium lifestyle amenities, and structural perfection in Besa\'s best neighborhood.',
    details: [
      'Stately 1-block boutique, premium low-density development',
      '7 storeys of meticulously planned structures maximizing daylight',
      'Super built-up area of 2,106 square feet with elegant balconies',
      'Centrally located with super-fast highway and metro connectivity'
    ],
    specs: [
      { label: 'Configuration', value: 'Luxury 3 BHK' },
      { label: 'Super Built-Up Area', value: '2,106 Sq. Ft.' },
      { label: 'Building Structure', value: '7 Storeys (Premium Block)' },
      { label: 'Total Units', value: '28 Exclusive Homes' },
      { label: 'Approval Status', value: 'RERA Registered & NMRDA Approved' }
    ],
    highlights: [
      '2106 Sq. Ft. Singular Opulent 3 BHK Layouts',
      'High-end 7-Storey Iconic Elevation',
      'Besa Prime Residential Coordinates',
      'Dedicated Reserved Double Car Parking'
    ],
    amenities: [
      'High-speed Branded Elevator',
      'Rooftop Executive Lounge Garden',
      'Kids Play Area with rubberized floor',
      '100% DG Back-up for Common Areas',
      'Rainwater Harvesting System',
      'Integrated Multi-tier Firefighting Grid',
      'Sleek Vitrified Tile Floorings'
    ],
    acres: 'Boutique Project',
    totalUnits: '28',
    priceRange: '₹85 Lakh onward',
    image: '/images/project_shraddha_png_1780484729700.png',
    gallery: [
      '/images/project_shraddha_png_1780484729700.png',
      '/images/heroimage.png'
    ],
    coordinate: { x: 52, y: 40 },
    mapHotspot: 'Besa Square Premium Belt'
  },
  {
    id: 'kharsoli-township',
    name: 'Kharsoli Township Project',
    slug: 'kharsoli-township',
    type: 'upcoming',
    location: 'Kharsoli, Nagpur',
    description: '[UPCOMING] A massive, master-planned residential township spread across 9 high-growth acres featuring 126 state-of-the-art residential plots designed for premium smart living.',
    details: [
      'Grand township development encompassing 9 sprawling green acres',
      'Features a highly modern road grid, smart fiber-ready planning',
      'Slated to include dedicated charging hubs and smart parking structures'
    ],
    specs: [
      { label: 'Project Status', value: 'Upcoming Project Launch' },
      { label: 'Development Size', value: '9 Sprawling Acres' },
      { label: 'Total Plots Planned', value: '126 Residential Plots' },
      { label: 'Target Launch', value: 'Q4 2026' }
    ],
    highlights: [
      '9-Acre Futuristic Gated Eco-System',
      '126 Smart Residential High-Value Plots',
      'Extremely Wide 40ft/50ft Internal Road Systems',
      'Hyper-growth Potential Near Major Ring Roads'
    ],
    amenities: [
      'Central Amphi-theatre Park',
      'Jogging Tracks and Outdoor Gym',
      'Advanced Water Harvesting Grid',
      'Commercial Retail Convenience Plaza Block'
    ],
    acres: '9',
    totalUnits: '126',
    priceRange: 'Pricing Released Upon Launch',
    image: '/images/heroimage.png',
    gallery: [
      '/images/heroimage.png'
    ],
    coordinate: { x: 70, y: 35 },
    mapHotspot: 'Kharsoli Growth Zone'
  },
  {
    id: 'mega-township',
    name: 'Mega Township Project',
    slug: 'mega-township',
    type: 'upcoming',
    location: 'Outer Ring Road Belt, Nagpur',
    description: '[UPCOMING MEGA PROJECT] An iconic, landmark city-scale township spread across 60+ mammoth acres, crafted to host more than 1000 residential plots, representing Nagpur\'s premier residential expansion destination.',
    details: [
      'Nagpur\'s biggest upcoming integrated township project',
      '60+ acres incorporating integrated educational, retail, and hospitality spaces',
      'Expected to become of the fastest appreciating clusters in central India'
    ],
    specs: [
      { label: 'Project Scale', value: '60+ Acres Super-Township' },
      { label: 'Total Plots Planned', value: '1000+ Plots' },
      { label: 'Amenities Provided', value: '35+ Integrated Facilities' },
      { label: 'Launch Phase', value: 'Pre-launch registration open' }
    ],
    highlights: [
      '60+ Acre Gated Integrated City Layout',
      '1000+ Residential Plots with diverse size options',
      'Expansive Central Theme Parks & Mini Lakes',
      'Superior Investment Value and Tier-1 Security'
    ],
    amenities: [
      'Ultra Luxury Multi-storey Grand Clubhouse',
      'State-of-the-Art Sports Arenas & Cricket Nets',
      'Swimming Pools and Health Care Outlets',
      'Integrated Educational Center Block'
    ],
    acres: '60+',
    totalUnits: '1000+',
    priceRange: 'Special Pre-launch rates on request',
    image: '/images/heroimage.png',
    gallery: [
      '/images/heroimage.png'
    ],
    coordinate: { x: 80, y: 65 },
    mapHotspot: 'Outer Ring Road Tech-Belt'
  }
];

export const AMENITIES_CATALOG = [
  { name: 'European Style Entrance Gate', icon: 'DoorOpen', desc: 'Prestige entry with 24/7 security booth' },
  { name: 'Landscaped Gardens', icon: 'Leaf', desc: 'Vast lush greenery with flowering plants' },
  { name: 'Children\'s Play Area', icon: 'Smile', desc: 'Secure custom rubberized play grounds' },
  { name: 'Jogging Track', icon: 'Footprints', desc: 'Premium paved paths weaving through greenery' },
  { name: 'Gazebos & Outdoor seating', icon: 'Flower2', desc: 'Elegantly placed timber gazebos for relaxation' },
  { name: 'Wide Tar & Cement Roads', icon: 'Route', desc: 'Sturdy internal road layouts up to 50ft wide' },
  { name: 'Street Lighting', icon: 'Lightbulb', desc: 'Eco-friendly LED lights throughout all layouts' },
  { name: 'Sewerage Network', icon: 'Waves', desc: 'Underground pipelines keeping environment hygienic' }
];

export const FAQS = [
  {
    q: 'Are bank loans available, and for what percentage?',
    a: 'Yes, absolutely. All our sanctioned projects have clear RL status (Non-Agricultural titles, NMRDA sanctioned). Hence, they are pre-approved by leading national and private housing finance departments for up to 80% bank loan assistance.'
  },
  {
    q: 'What makes Melbourne City Sector II and Canberra City prime investments?',
    a: 'Both are located in fast-appreciating belts of South Nagpur (Kaldongri / Wardha Road hub). Wardha Road is a premier technology and connectivity artery of Nagpur. The plots are sanctioned, clear-titled, RL-marked layouts, offering dual benefits of rapid value appreciation and ready immediate home construction security.'
  },
  {
    q: 'Do you offer options other than residential plots?',
    a: 'Yes, we are full-suite real estate developers. Beyond plotted layouts (Melbourne, Canberra, upcoming townships), we offer elite boutique multi-family residences like Shraddha Bhakti Avenue, featuring bespoke, spacious 3 BHK luxury flats with premium super built-up sizes.'
  },
  {
    q: 'Can I easily book a physical site visit?',
    a: 'Yes! Site visits are completely free. We provide private air-conditioned vehicle transport from our Besa Round Office directly to and from any of our project sites. Simply request a visit through our automated booking console or dial our direct helpline numbers.'
  },
  {
    q: 'What documents are supplied on purchasing a plot?',
    a: 'We provide complete RL certification copy, approved Layout Map, Sale Deed, Index-II, Mutation Certificate, and 7/12 extract confirming clear individual ownership transfer, assuring piece of mind.'
  }
];

export const BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'Why Wardha Road Belt is Nagpur\'s Best Real Estate Investment Corridor',
    slug: 'nagpur-real-estate-corridors',
    summary: 'Analyze why Southern Nagpur, specifically the Wardha Road and Besa areas, continues to capture over 60% of real estate transactions in Nagpur.',
    content: `Nagpur continues to rise rapidly as one of central India's primary multi-modal hubs. Driven by the Multi-modal International Cargo Hub and Airport at Nagpur (MIHAN), the entire southern growth corridor along Wardha Road has emerged as an unparalleled real estate hotspot.

For potential homebuyers and long-term land investors, the Wardha Road region offers a perfect trifecta:
1. **Unmatched Connectivity**: Proximity to the Metro network, Outer Ring Road, and Dr. Babasaheb Ambedkar International Airport makes daily traveling incredibly efficient.
2. **Economic Engines**: MIHAN houses top tech leaders (TCS, Infosys, Tech Mahindra) and logistics giants, creating massive white-collar housing demand.
3. **Plotted Layout Standards**: Modern gated layouts with proper NMRDA RL markings ensure your title deeds are fully compliant, clean, and pre-approved for top-tier loans.

Investing in projects like Canberra City or Melbourne City Sector II along this smart ring road corridor positions your portfolio right in the line of Nagpur's high-speed geographical extension.`,
    category: 'Market Trends',
    readTime: '4 min read',
    date: 'May 28, 2026',
    image: '/images/heroimage.png'
  },
  {
    id: 'blog-2',
    title: 'Understanding NMRDA RL & Non-Agricultural Sanctioning',
    slug: 'understanding-mrd-rl-nagpur',
    summary: 'A complete handbook on what NMRDA and RL mean in Nagpur real estate. Learn how to verify legal clear titles before buying residential plots.',
    content: `When purchasing land in Nagpur, you will often hear developers use the term "RL layout" or "NMRDA Approved". But what exactly do these terms stand for, and why are they critical for your financial protection?

RL stands for "Release Letter". After the Nagpur Metropolitan Region Development Authority (NMRDA) approves a plotted residential layout, they release individual plots to the developer only after checking that basic public infrastructure (roads, water lines, sewerage grids, transformers) has been properly designed and laid down.

Here is why you should ONLY purchase RL plots:
- **Immediate Building Permission**: You can present your plans to local bodies and construct your dream home immediately.
- **Easy Bank Funding**: Leading banks (like SBI, HDFC, ICICI) will only finance layouts having active RL releases.
- **Clean Title Assurance**: The release letter ensures the land has no ongoing ownership litigations or pending state encumbrances.

At 4 Pillars Realty, projects like Melbourne City Sector II are NMRDA Sanctioned RL layouts, ensuring perfect legal safety and peace of mind for every square foot.`,
    category: 'Legal Guide',
    readTime: '6 min read',
    date: 'April 15, 2026',
    image: '/images/project_melbourne_png_1780484693295.png'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'success', message: 'Plot 42 in Melbourne City Sector II was booked just now!', timestamp: 'Just now', projectSlug: 'melbourne-city-sector-ii' },
  { id: '2', type: 'info', message: 'Pre-launch registration opened for 60+ Acre Mega Township Project.', timestamp: '10 min ago', projectSlug: 'mega-township' },
  { id: '3', type: 'alert', message: 'Interest Rate Drop! High-end housing bank loans now at 8.15% SBA.', timestamp: '1 hr ago' },
  { id: '4', type: 'success', message: 'A duplex home site physical visit booked for Canberra City plots.', timestamp: '3 hrs ago', projectSlug: 'canberra-city' }
];
