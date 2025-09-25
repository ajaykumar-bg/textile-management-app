// Mock data for Design Management module

export const designData = {
  designs: [
    {
      id: 'DES-001',
      name: 'Floral Paradise',
      category: 'Printed',
      type: 'Cotton',
      designer: 'Sarah Johnson',
      status: 'Approved',
      createdDate: '2025-01-10',
      lastModified: '2025-01-15',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
      repeat: '32cm x 24cm',
      dpi: '300',
      colorways: 4,
      description: 'Beautiful floral pattern with tropical elements',
      fabric: 'Cotton Poplin',
      weight: '120 GSM',
      width: '150cm',
      thumbnail: '/images/designs/floral-paradise.jpg',
    },
    {
      id: 'DES-002',
      name: 'Geometric Fusion',
      category: 'Jacquard',
      type: 'Polyester',
      designer: 'Mark Rodriguez',
      status: 'In Development',
      createdDate: '2025-01-08',
      lastModified: '2025-01-18',
      colors: ['#2C3E50', '#E74C3C', '#F39C12', '#FFFFFF'],
      repeat: '24cm x 24cm',
      dpi: '150',
      colorways: 3,
      description: 'Modern geometric pattern with contemporary appeal',
      fabric: 'Polyester Blend',
      weight: '180 GSM',
      width: '140cm',
      thumbnail: '/images/designs/geometric-fusion.jpg',
    },
    {
      id: 'DES-003',
      name: 'Vintage Roses',
      category: 'Printed',
      type: 'Silk',
      designer: 'Emily Chen',
      status: 'Sampling',
      createdDate: '2025-01-05',
      lastModified: '2025-01-20',
      colors: ['#8E44AD', '#E91E63', '#F8BBD9', '#FFFFFF'],
      repeat: '40cm x 30cm',
      dpi: '300',
      colorways: 5,
      description: 'Classic vintage rose pattern with romantic feel',
      fabric: 'Silk Crepe',
      weight: '95 GSM',
      width: '110cm',
      thumbnail: '/images/designs/vintage-roses.jpg',
    },
    {
      id: 'DES-004',
      name: 'Abstract Waves',
      category: 'Digital Print',
      type: 'Viscose',
      designer: 'David Kumar',
      status: 'Approved',
      createdDate: '2025-01-12',
      lastModified: '2025-01-19',
      colors: ['#3498DB', '#1ABC9C', '#16A085', '#FFFFFF'],
      repeat: '60cm x 45cm',
      dpi: '300',
      colorways: 2,
      description: 'Contemporary abstract wave pattern',
      fabric: 'Viscose Rayon',
      weight: '140 GSM',
      width: '145cm',
      thumbnail: '/images/designs/abstract-waves.jpg',
    },
  ],

  patterns: [
    {
      id: 'PAT-001',
      name: 'Classic Stripes',
      type: 'Woven',
      category: 'Basic',
      repeat: '2cm',
      complexity: 'Low',
      threadCount: '60x60',
      structure: 'Plain Weave',
      variations: [
        { name: 'Narrow Stripe', width: '0.5cm' },
        { name: 'Medium Stripe', width: '1cm' },
        { name: 'Wide Stripe', width: '2cm' },
      ],
    },
    {
      id: 'PAT-002',
      name: 'Herringbone',
      type: 'Woven',
      category: 'Structured',
      repeat: '4cm',
      complexity: 'Medium',
      threadCount: '80x80',
      structure: 'Twill Weave',
      variations: [
        { name: 'Fine Herringbone', angle: '30°' },
        { name: 'Bold Herringbone', angle: '45°' },
      ],
    },
    {
      id: 'PAT-003',
      name: 'Paisley Traditional',
      type: 'Printed',
      category: 'Ethnic',
      repeat: '25cm x 30cm',
      complexity: 'High',
      colors: 8,
      style: 'Traditional Indian',
      variations: [
        { name: 'Small Paisley', scale: '50%' },
        { name: 'Large Paisley', scale: '150%' },
      ],
    },
  ],

  colorPalettes: [
    {
      id: 'CP-001',
      name: 'Ocean Breeze',
      colors: [
        { name: 'Deep Ocean', hex: '#1B4F72', pantone: 'PMS 2965' },
        { name: 'Sea Foam', hex: '#48C9B0', pantone: 'PMS 3262' },
        { name: 'Sandy Beach', hex: '#F7DC6F', pantone: 'PMS 141' },
        { name: 'Coral Reef', hex: '#EC7063', pantone: 'PMS 178' },
      ],
      season: 'Spring/Summer',
      mood: 'Fresh, Tropical',
    },
    {
      id: 'CP-002',
      name: 'Autumn Harvest',
      colors: [
        { name: 'Burgundy Wine', hex: '#922B21', pantone: 'PMS 188' },
        { name: 'Golden Wheat', hex: '#D68910', pantone: 'PMS 130' },
        { name: 'Forest Green', hex: '#1E8449', pantone: 'PMS 348' },
        { name: 'Cream', hex: '#FAD7A0', pantone: 'PMS 155' },
      ],
      season: 'Fall/Winter',
      mood: 'Warm, Earthy',
    },
    {
      id: 'CP-003',
      name: 'Urban Minimalist',
      colors: [
        { name: 'Charcoal', hex: '#2C3E50', pantone: 'PMS 432' },
        { name: 'Cool Gray', hex: '#85929E', pantone: 'PMS 430' },
        { name: 'Pure White', hex: '#FFFFFF', pantone: 'PMS White' },
        { name: 'Accent Blue', hex: '#3498DB', pantone: 'PMS 2925' },
      ],
      season: 'All Season',
      mood: 'Modern, Clean',
    },
  ],

  collections: [
    {
      id: 'COL-001',
      name: 'Summer Vibes 2025',
      season: 'Spring/Summer 2025',
      theme: 'Tropical Paradise',
      designCount: 12,
      status: 'In Development',
      targetLaunch: '2025-03-15',
      designs: ['DES-001', 'DES-004'],
      colorPalette: 'CP-001',
      description:
        'Fresh and vibrant collection inspired by tropical destinations',
    },
    {
      id: 'COL-002',
      name: 'Heritage Classics',
      season: 'Fall/Winter 2025',
      theme: 'Traditional Elegance',
      designCount: 8,
      status: 'Planning',
      targetLaunch: '2025-08-01',
      designs: ['DES-003'],
      colorPalette: 'CP-002',
      description: 'Timeless patterns with a contemporary twist',
    },
  ],

  designProcess: [
    {
      stage: 'Concept',
      duration: '3-5 days',
      description: 'Initial ideation and sketching',
    },
    {
      stage: 'Digital Design',
      duration: '5-7 days',
      description: 'Create digital artwork and repeats',
    },
    {
      stage: 'Color Development',
      duration: '2-3 days',
      description: 'Develop colorways and palettes',
    },
    {
      stage: 'Technical Review',
      duration: '1-2 days',
      description: 'Review technical feasibility',
    },
    {
      stage: 'Sample Production',
      duration: '7-10 days',
      description: 'Create physical samples',
    },
    {
      stage: 'Approval',
      duration: '2-3 days',
      description: 'Final approval process',
    },
  ],

  designStats: {
    totalDesigns: 127,
    activeDesigns: 45,
    approvedThisMonth: 8,
    inDevelopment: 23,
    designCategories: [
      { category: 'Printed', count: 65, percentage: 51.2 },
      { category: 'Jacquard', count: 32, percentage: 25.2 },
      { category: 'Embroidered', count: 20, percentage: 15.7 },
      { category: 'Digital Print', count: 10, percentage: 7.9 },
    ],
    popularColors: [
      { color: 'Blue Variants', usage: 34 },
      { color: 'Green Variants', usage: 28 },
      { color: 'Red Variants', usage: 25 },
      { color: 'Yellow Variants', usage: 22 },
    ],
  },
};

export const designStatusColors = {
  Approved: 'success',
  'In Development': 'warning',
  Sampling: 'info',
  Rejected: 'error',
  'On Hold': 'default',
};

export const designCategories = [
  'Printed',
  'Jacquard',
  'Embroidered',
  'Digital Print',
  'Woven',
  'Knit',
];

export const fabricTypes = [
  'Cotton',
  'Polyester',
  'Silk',
  'Viscose',
  'Linen',
  'Wool',
  'Blend',
];

export const designComplexity = ['Low', 'Medium', 'High', 'Very High'];

export const seasons = [
  'Spring/Summer',
  'Fall/Winter',
  'All Season',
  'Holiday/Special',
];
