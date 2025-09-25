// Sales module constants and mock data

export const salesData = {
  // Sales orders
  orders: [
    {
      id: 'SO-2025-001',
      customerName: 'Fashion Forward Ltd',
      customerContact: 'John Smith',
      customerEmail: 'john@fashionforward.com',
      orderDate: '2025-09-20',
      deliveryDate: '2025-10-05',
      status: 'Processing',
      priority: 'High',
      totalAmount: 15750.0,
      items: [
        {
          id: 'ITEM-001',
          productId: 'FAB-001',
          productName: 'Cotton Premium',
          quantity: 200,
          unitPrice: 12.5,
          totalPrice: 2500.0,
        },
        {
          id: 'ITEM-002',
          productId: 'FAB-002',
          productName: 'Silk Blend Luxury',
          quantity: 150,
          unitPrice: 35.0,
          totalPrice: 5250.0,
        },
      ],
      shippingAddress: {
        street: '123 Fashion Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      paymentStatus: 'Pending',
      paymentMethod: 'Bank Transfer',
      discount: 0,
      taxAmount: 787.5,
      shippingCost: 200.0,
    },
    {
      id: 'SO-2025-002',
      customerName: 'Boutique Elegance',
      customerContact: 'Sarah Johnson',
      customerEmail: 'sarah@boutiqueelegance.com',
      orderDate: '2025-09-22',
      deliveryDate: '2025-10-08',
      status: 'Confirmed',
      priority: 'Medium',
      totalAmount: 8925.0,
      items: [
        {
          id: 'ITEM-003',
          productId: 'FAB-003',
          productName: 'Polyester Blend',
          quantity: 300,
          unitPrice: 8.75,
          totalPrice: 2625.0,
        },
      ],
      shippingAddress: {
        street: '456 Retail Blvd',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
      },
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      discount: 150.0,
      taxAmount: 446.25,
      shippingCost: 150.0,
    },
    {
      id: 'SO-2025-003',
      customerName: 'Designer Trends Co',
      customerContact: 'Michael Brown',
      customerEmail: 'michael@designertrends.com',
      orderDate: '2025-09-24',
      deliveryDate: '2025-10-12',
      status: 'Draft',
      priority: 'Low',
      totalAmount: 5280.0,
      items: [
        {
          id: 'ITEM-004',
          productId: 'FAB-004',
          productName: 'Linen Natural',
          quantity: 120,
          unitPrice: 22.0,
          totalPrice: 2640.0,
        },
      ],
      shippingAddress: {
        street: '789 Design St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA',
      },
      paymentStatus: 'Not Required',
      paymentMethod: 'Net 30',
      discount: 0,
      taxAmount: 264.0,
      shippingCost: 100.0,
    },
  ],

  // Customers
  customers: [
    {
      id: 'CUST-001',
      name: 'Fashion Forward Ltd',
      type: 'Wholesale',
      contact: 'John Smith',
      email: 'john@fashionforward.com',
      phone: '+1-555-0123',
      address: '123 Fashion Ave, New York, NY 10001',
      creditLimit: 50000,
      currentBalance: 15750.0,
      paymentTerms: 'Net 30',
      lastOrderDate: '2025-09-20',
      totalOrders: 25,
      lifetimeValue: 125000,
    },
    {
      id: 'CUST-002',
      name: 'Boutique Elegance',
      type: 'Retail',
      contact: 'Sarah Johnson',
      email: 'sarah@boutiqueelegance.com',
      phone: '+1-555-0124',
      address: '456 Retail Blvd, Los Angeles, CA 90210',
      creditLimit: 25000,
      currentBalance: 0,
      paymentTerms: 'Immediate',
      lastOrderDate: '2025-09-22',
      totalOrders: 18,
      lifetimeValue: 85000,
    },
    {
      id: 'CUST-003',
      name: 'Designer Trends Co',
      type: 'Designer',
      contact: 'Michael Brown',
      email: 'michael@designertrends.com',
      phone: '+1-555-0125',
      address: '789 Design St, Chicago, IL 60601',
      creditLimit: 35000,
      currentBalance: 5280.0,
      paymentTerms: 'Net 30',
      lastOrderDate: '2025-09-24',
      totalOrders: 12,
      lifetimeValue: 65000,
    },
  ],

  // Sales performance data
  performance: {
    monthlyRevenue: [
      { month: 'Jan', revenue: 185000, orders: 45, target: 180000 },
      { month: 'Feb', revenue: 195000, orders: 52, target: 190000 },
      { month: 'Mar', revenue: 210000, orders: 48, target: 200000 },
      { month: 'Apr', revenue: 225000, orders: 55, target: 210000 },
      { month: 'May', revenue: 240000, orders: 60, target: 220000 },
      { month: 'Jun', revenue: 255000, orders: 58, target: 230000 },
      { month: 'Jul', revenue: 270000, orders: 65, target: 240000 },
      { month: 'Aug', revenue: 285000, orders: 62, target: 250000 },
      { month: 'Sep', revenue: 300000, orders: 68, target: 260000 },
    ],
    topProducts: [
      { name: 'Cotton Premium', revenue: 45000, quantity: 1200, growth: 15.2 },
      {
        name: 'Silk Blend Luxury',
        revenue: 38000,
        quantity: 850,
        growth: 22.8,
      },
      { name: 'Linen Natural', revenue: 32000, quantity: 600, growth: 8.5 },
      { name: 'Polyester Blend', revenue: 28000, quantity: 1500, growth: 12.3 },
    ],
    salesByRegion: [
      { region: 'North America', revenue: 1250000, percentage: 45 },
      { region: 'Europe', revenue: 850000, percentage: 30 },
      { region: 'Asia Pacific', revenue: 480000, percentage: 17 },
      { region: 'Others', revenue: 220000, percentage: 8 },
    ],
    customerSegments: [
      { segment: 'Wholesale', count: 45, revenue: 1800000, avgOrder: 40000 },
      { segment: 'Retail', count: 120, revenue: 850000, avgOrder: 7083 },
      { segment: 'Designer', count: 35, revenue: 650000, avgOrder: 18571 },
    ],
  },

  // Quotations
  quotations: [
    {
      id: 'QUO-2025-001',
      customerName: 'New Fashion House',
      contactPerson: 'Emily Davis',
      email: 'emily@newfashion.com',
      quoteDate: '2025-09-25',
      validUntil: '2025-10-25',
      status: 'Sent',
      totalAmount: 22500.0,
      items: [
        {
          productId: 'FAB-001',
          productName: 'Cotton Premium',
          quantity: 500,
          unitPrice: 12.5,
          totalPrice: 6250.0,
        },
        {
          productId: 'FAB-002',
          productName: 'Silk Blend Luxury',
          quantity: 200,
          unitPrice: 35.0,
          totalPrice: 7000.0,
        },
      ],
    },
  ],
};

// Status color mappings
export const salesStatusColors = {
  Draft: 'default',
  Confirmed: 'info',
  Processing: 'warning',
  Shipped: 'primary',
  Delivered: 'success',
  Cancelled: 'error',
  'On Hold': 'secondary',
};

export const paymentStatusColors = {
  'Not Required': 'default',
  Pending: 'warning',
  Paid: 'success',
  Overdue: 'error',
  Partial: 'info',
};

export const priorityColors = {
  Low: 'success',
  Medium: 'warning',
  High: 'error',
  Urgent: 'error',
};

// Chart configurations for sales
export const salesChartConfig = {
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
  },
  regionColors: ['#1976d2', '#4caf50', '#ff9800', '#f44336'],
};
