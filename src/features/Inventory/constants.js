// Inventory module constants and mock data

export const inventoryData = {
  // Fabrics and materials
  fabrics: [
    {
      id: 'FAB-001',
      name: 'Cotton Premium',
      category: 'Cotton',
      type: 'Raw Material',
      currentStock: 850,
      minStock: 100,
      maxStock: 1000,
      unit: 'yards',
      unitPrice: 12.5,
      totalValue: 10625,
      supplier: 'Cotton Mills Ltd',
      location: 'Warehouse A',
      lastUpdated: '2025-09-20',
      status: 'In Stock',
      quality: 'Premium',
      composition: '100% Cotton',
      width: '60 inches',
      weight: '150 GSM',
    },
    {
      id: 'FAB-002',
      name: 'Silk Blend Luxury',
      category: 'Silk',
      type: 'Raw Material',
      currentStock: 45,
      minStock: 50,
      maxStock: 500,
      unit: 'yards',
      unitPrice: 35.0,
      totalValue: 1575,
      supplier: 'Silk Traders Inc',
      location: 'Warehouse B',
      lastUpdated: '2025-09-22',
      status: 'Low Stock',
      quality: 'Luxury',
      composition: '70% Silk, 30% Cotton',
      width: '45 inches',
      weight: '120 GSM',
    },
    {
      id: 'FAB-003',
      name: 'Polyester Blend',
      category: 'Synthetic',
      type: 'Raw Material',
      currentStock: 320,
      minStock: 100,
      maxStock: 600,
      unit: 'yards',
      unitPrice: 8.75,
      totalValue: 2800,
      supplier: 'Synthetic Fabrics Co',
      location: 'Warehouse A',
      lastUpdated: '2025-09-21',
      status: 'In Stock',
      quality: 'Standard',
      composition: '65% Polyester, 35% Cotton',
      width: '58 inches',
      weight: '140 GSM',
    },
    {
      id: 'FAB-004',
      name: 'Linen Natural',
      category: 'Linen',
      type: 'Raw Material',
      currentStock: 180,
      minStock: 80,
      maxStock: 400,
      unit: 'yards',
      unitPrice: 22.0,
      totalValue: 3960,
      supplier: 'Natural Fibers Ltd',
      location: 'Warehouse C',
      lastUpdated: '2025-09-19',
      status: 'In Stock',
      quality: 'Premium',
      composition: '100% Linen',
      width: '52 inches',
      weight: '180 GSM',
    },
  ],

  // Finished products
  products: [
    {
      id: 'PROD-001',
      name: 'Cotton Shirt Fabric',
      category: 'Shirting',
      type: 'Finished Product',
      currentStock: 125,
      minStock: 20,
      maxStock: 200,
      unit: 'pieces',
      unitPrice: 28.5,
      totalValue: 3562.5,
      location: 'Showroom A',
      lastUpdated: '2025-09-23',
      status: 'In Stock',
      pattern: 'Plain',
      color: 'White',
      season: 'All Season',
    },
    {
      id: 'PROD-002',
      name: 'Designer Saree Fabric',
      category: 'Ethnic Wear',
      type: 'Finished Product',
      currentStock: 15,
      minStock: 10,
      maxStock: 50,
      unit: 'pieces',
      unitPrice: 85.0,
      totalValue: 1275,
      location: 'Showroom B',
      lastUpdated: '2025-09-24',
      status: 'Low Stock',
      pattern: 'Embroidered',
      color: 'Multi-color',
      season: 'Festival',
    },
  ],

  // Categories
  categories: [
    { id: 'cotton', name: 'Cotton', count: 45, value: 125000 },
    { id: 'silk', name: 'Silk', count: 23, value: 85000 },
    { id: 'synthetic', name: 'Synthetic', count: 67, value: 75000 },
    { id: 'linen', name: 'Linen', count: 34, value: 95000 },
    { id: 'wool', name: 'Wool', count: 28, value: 110000 },
  ],

  // Suppliers
  suppliers: [
    {
      id: 'SUP-001',
      name: 'Cotton Mills Ltd',
      contact: 'John Smith',
      phone: '+1-555-0123',
    },
    {
      id: 'SUP-002',
      name: 'Silk Traders Inc',
      contact: 'Mary Johnson',
      phone: '+1-555-0124',
    },
    {
      id: 'SUP-003',
      name: 'Synthetic Fabrics Co',
      contact: 'Robert Davis',
      phone: '+1-555-0125',
    },
    {
      id: 'SUP-004',
      name: 'Natural Fibers Ltd',
      contact: 'Sarah Wilson',
      phone: '+1-555-0126',
    },
  ],

  // Stock movements
  movements: [
    {
      id: 'MOV-001',
      itemId: 'FAB-001',
      itemName: 'Cotton Premium',
      type: 'Inbound',
      quantity: 200,
      date: '2025-09-20',
      reference: 'PO-2025-001',
      reason: 'Purchase Order',
    },
    {
      id: 'MOV-002',
      itemId: 'FAB-002',
      itemName: 'Silk Blend Luxury',
      type: 'Outbound',
      quantity: 25,
      date: '2025-09-22',
      reference: 'SO-2025-015',
      reason: 'Sales Order',
    },
    {
      id: 'MOV-003',
      itemId: 'PROD-001',
      itemName: 'Cotton Shirt Fabric',
      type: 'Production',
      quantity: 50,
      date: '2025-09-23',
      reference: 'PROD-2025-008',
      reason: 'Production Output',
    },
  ],

  // Warehouse locations
  warehouses: [
    {
      id: 'WH-A',
      name: 'Warehouse A',
      location: 'North Block',
      capacity: '10,000 sq ft',
      utilization: 75,
    },
    {
      id: 'WH-B',
      name: 'Warehouse B',
      location: 'South Block',
      capacity: '8,000 sq ft',
      utilization: 60,
    },
    {
      id: 'WH-C',
      name: 'Warehouse C',
      location: 'East Block',
      capacity: '12,000 sq ft',
      utilization: 85,
    },
  ],
};

// Status color mappings
export const statusColors = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'error',
  'Reorder Required': 'error',
  Overstock: 'info',
};

// Movement type colors
export const movementColors = {
  Inbound: 'success',
  Outbound: 'error',
  Production: 'info',
  Transfer: 'warning',
  Adjustment: 'secondary',
};

// Chart configurations
export const inventoryChartConfig = {
  colors: {
    primary: '#1976d2',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
  },
  categoryColors: ['#1976d2', '#4caf50', '#ff9800', '#f44336', '#9c27b0'],
};
