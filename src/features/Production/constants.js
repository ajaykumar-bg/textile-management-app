// Production module constants and mock data

export const productionData = {
  // Production orders
  orders: [
    {
      id: 'PROD-2025-001',
      productName: 'Cotton Shirt Fabric',
      orderQty: 500,
      producedQty: 350,
      remainingQty: 150,
      startDate: '2025-09-20',
      plannedEndDate: '2025-09-30',
      actualEndDate: null,
      status: 'In Progress',
      priority: 'High',
      machine: 'Loom-001',
      operator: 'John Smith',
      supervisor: 'Mary Johnson',
      rawMaterials: [
        {
          material: 'Cotton Premium',
          required: 600,
          consumed: 420,
          remaining: 180,
        },
      ],
      qualityChecks: [
        { stage: 'Raw Material', status: 'Passed', date: '2025-09-20' },
        { stage: 'In Process', status: 'Pending', date: null },
        { stage: 'Final', status: 'Pending', date: null },
      ],
      efficiency: 85,
      defectRate: 2.5,
      notes: 'Rush order for Fashion Forward Ltd',
    },
    {
      id: 'PROD-2025-002',
      productName: 'Silk Saree Fabric',
      orderQty: 200,
      producedQty: 200,
      remainingQty: 0,
      startDate: '2025-09-15',
      plannedEndDate: '2025-09-25',
      actualEndDate: '2025-09-24',
      status: 'Completed',
      priority: 'Medium',
      machine: 'Loom-002',
      operator: 'Sarah Wilson',
      supervisor: 'Robert Davis',
      rawMaterials: [
        {
          material: 'Silk Blend Luxury',
          required: 240,
          consumed: 240,
          remaining: 0,
        },
      ],
      qualityChecks: [
        { stage: 'Raw Material', status: 'Passed', date: '2025-09-15' },
        { stage: 'In Process', status: 'Passed', date: '2025-09-20' },
        { stage: 'Final', status: 'Passed', date: '2025-09-24' },
      ],
      efficiency: 92,
      defectRate: 1.2,
      notes: 'High quality output achieved',
    },
  ],

  // Machines and equipment
  machines: [
    {
      id: 'LOOM-001',
      name: 'Power Loom Alpha',
      type: 'Weaving Loom',
      status: 'Running',
      currentJob: 'PROD-2025-001',
      operator: 'John Smith',
      capacity: 50,
      currentOutput: 42,
      efficiency: 84,
      lastMaintenance: '2025-09-10',
      nextMaintenance: '2025-10-10',
      totalHours: 1250,
      maintenanceHours: 45,
      breakdown: 0,
    },
    {
      id: 'LOOM-002',
      name: 'Power Loom Beta',
      type: 'Weaving Loom',
      status: 'Idle',
      currentJob: null,
      operator: 'Available',
      capacity: 45,
      currentOutput: 0,
      efficiency: 0,
      lastMaintenance: '2025-09-18',
      nextMaintenance: '2025-10-18',
      totalHours: 1180,
      maintenanceHours: 38,
      breakdown: 2,
    },
    {
      id: 'DYE-001',
      name: 'Digital Dyeing Unit',
      type: 'Dyeing Machine',
      status: 'Maintenance',
      currentJob: null,
      operator: 'Maintenance Team',
      capacity: 100,
      currentOutput: 0,
      efficiency: 0,
      lastMaintenance: '2025-09-25',
      nextMaintenance: '2025-10-25',
      totalHours: 980,
      maintenanceHours: 125,
      breakdown: 1,
    },
  ],

  // Quality control
  qualityMetrics: {
    overallDefectRate: 2.1,
    firstPassYield: 94.5,
    customerReturns: 0.8,
    qualityScore: 4.6,
    inspectionResults: [
      {
        date: '2025-09-20',
        batch: 'B-001',
        product: 'Cotton Shirt',
        result: 'Pass',
        defects: 1,
      },
      {
        date: '2025-09-21',
        batch: 'B-002',
        product: 'Cotton Shirt',
        result: 'Pass',
        defects: 0,
      },
      {
        date: '2025-09-22',
        batch: 'B-003',
        product: 'Cotton Shirt',
        result: 'Fail',
        defects: 5,
      },
      {
        date: '2025-09-23',
        batch: 'B-004',
        product: 'Silk Saree',
        result: 'Pass',
        defects: 0,
      },
      {
        date: '2025-09-24',
        batch: 'B-005',
        product: 'Silk Saree',
        result: 'Pass',
        defects: 1,
      },
    ],
  },

  // Production planning
  planning: {
    weeklySchedule: [
      { day: 'Monday', planned: 120, actual: 115, machine: 'LOOM-001' },
      { day: 'Tuesday', planned: 120, actual: 125, machine: 'LOOM-001' },
      { day: 'Wednesday', planned: 120, actual: 110, machine: 'LOOM-001' },
      { day: 'Thursday', planned: 120, actual: 118, machine: 'LOOM-001' },
      { day: 'Friday', planned: 120, actual: 122, machine: 'LOOM-001' },
      { day: 'Saturday', planned: 100, actual: 98, machine: 'LOOM-001' },
      { day: 'Sunday', planned: 0, actual: 0, machine: 'LOOM-001' },
    ],
    capacity: {
      totalCapacity: 1200,
      currentUtilization: 876,
      availableCapacity: 324,
      utilizationRate: 73,
    },
  },

  // Performance metrics
  performance: {
    monthlyProduction: [
      { month: 'Jan', produced: 2800, target: 3000, efficiency: 93 },
      { month: 'Feb', produced: 3200, target: 3200, efficiency: 100 },
      { month: 'Mar', produced: 2950, target: 3100, efficiency: 95 },
      { month: 'Apr', produced: 3400, target: 3300, efficiency: 103 },
      { month: 'May', produced: 3100, target: 3200, efficiency: 97 },
      { month: 'Jun', produced: 3300, target: 3400, efficiency: 97 },
      { month: 'Jul', produced: 3500, target: 3500, efficiency: 100 },
      { month: 'Aug', produced: 3200, target: 3300, efficiency: 97 },
      { month: 'Sep', produced: 2900, target: 3200, efficiency: 91 },
    ],
    downtime: [
      { reason: 'Planned Maintenance', hours: 24, percentage: 15 },
      { reason: 'Unplanned Breakdown', hours: 18, percentage: 11 },
      { reason: 'Material Shortage', hours: 32, percentage: 20 },
      { reason: 'Setup/Changeover', hours: 28, percentage: 17 },
      { reason: 'Quality Issues', hours: 12, percentage: 7 },
      { reason: 'Other', hours: 46, percentage: 30 },
    ],
  },
};

// Status color mappings
export const productionStatusColors = {
  Planned: 'default',
  'In Progress': 'warning',
  Completed: 'success',
  'On Hold': 'secondary',
  Cancelled: 'error',
};

export const machineStatusColors = {
  Running: 'success',
  Idle: 'warning',
  Maintenance: 'info',
  Breakdown: 'error',
  Setup: 'secondary',
};

export const qualityStatusColors = {
  Pass: 'success',
  Fail: 'error',
  Pending: 'warning',
};

// Chart configurations
export const productionChartConfig = {
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
  },
};
