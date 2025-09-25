# Dashboard Component Structure

This folder contains the refactored Dashboard component broken down into smaller, more manageable pieces.

## 📁 Folder Structure

```
Dashboard/
├── index.js                 # Barrel exports for all components
├── constants.js            # Dashboard data and configuration constants
├── Dashboard.js            # Main dashboard container component
├── StatCard.js             # Reusable stat card component
├── AdminDashboard.js       # Admin-specific dashboard view
├── StaffDashboard.js       # Staff-specific dashboard view
├── CustomerDashboard.js    # Customer-specific dashboard view
└── README.md              # This documentation
```

## 🧩 Components

### **Dashboard.js** (Main Container)

- **Purpose**: Main dashboard component that renders role-based content
- **Responsibilities**:
  - User role detection
  - Header rendering
  - Role-based component routing
  - Permission fallback handling
- **Dependencies**: UserContext, role-specific dashboard components

### **StatCard.js** (Reusable Component)

- **Purpose**: Standardized card component for displaying statistics
- **Features**:
  - Icon display
  - Value formatting (includes K suffix for large numbers)
  - Trend indicators
  - Subtitle support
  - Consistent styling across all dashboards
- **Props**: `title`, `value`, `icon`, `color`, `trend`, `subtitle`

### **AdminDashboard.js** (Role-Specific View)

- **Purpose**: Comprehensive admin dashboard with business metrics
- **Features**:
  - Revenue, orders, customers, products overview
  - Monthly revenue trend chart (LineChart)
  - Order status breakdown (PieChart)
  - Top performing products grid
- **Charts**: LineChart for revenue trends, PieChart for order status

### **StaffDashboard.js** (Role-Specific View)

- **Purpose**: Operations-focused dashboard for staff members
- **Features**:
  - Inventory management stats
  - Low stock alerts
  - Daily production tracking (BarChart)
  - Order priority breakdown (PieChart)
  - Detailed inventory levels with progress indicators
- **Charts**: BarChart for production, PieChart for priorities

### **CustomerDashboard.js** (Role-Specific View)

- **Purpose**: Customer-centric dashboard for order tracking
- **Features**:
  - Personal order statistics
  - Order history visualization (BarChart)
  - Spending trends (SparkLineChart)
  - Recent orders with status chips
- **Charts**: BarChart for order history, SparkLineChart for spending

### **constants.js** (Data & Configuration)

- **Purpose**: Centralized data management and configuration
- **Contents**:
  - `dashboardData`: Mock data for all dashboard types
  - `chartConfig`: Color schemes, labels, and chart settings
  - `statusColors`: Status-to-color mappings for chips
- **Benefits**: Easy data updates, consistent styling, single source of truth

## 📊 Data Structure

### Dashboard Data Schema

```javascript
{
  admin: {
    totalRevenue, totalOrders, totalCustomers, totalProducts,
    monthlyRevenue[], ordersByStatus[], topProducts[]
  },
  staff: {
    inventoryItems, lowStockItems, ordersToProcess, completedToday,
    inventoryLevels[], dailyProduction[], ordersByPriority[]
  },
  customer: {
    myOrders, activeOrders, completedOrders, cancelledOrders,
    orderHistory[], recentOrders[]
  }
}
```

## 🎨 Chart Components Used

- **LineChart**: Revenue trends, time-series data
- **BarChart**: Order history, production metrics
- **PieChart**: Status breakdowns, priority distributions
- **SparkLineChart**: Compact trend visualization

## 🔧 Material-UI Grid System

- **New Syntax**: Uses `size={{ xs: 12, sm: 6, md: 3 }}` format
- **Responsive**: All components adapt to screen sizes
- **Consistent**: 3-column spacing throughout

## 🚀 Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: StatCard component used across all dashboards
3. **Maintainability**: Easy to update individual dashboard sections
4. **Scalability**: Simple to add new dashboard types or modify existing ones
5. **Performance**: Code splitting potential for role-specific components
6. **Testing**: Easier unit testing of individual components
7. **Data Management**: Centralized constants for easy updates

## 🔄 Import Usage

```javascript
// Individual imports
import { Dashboard, AdminDashboard, StatCard } from './Dashboard';

// Or use the existing import (maintained for compatibility)
import Dashboard from './Dashboard';
```

## 📝 Future Enhancements

- Add PropTypes or TypeScript for type safety
- Implement data fetching hooks for real API integration
- Add unit tests for each component
- Consider React.memo for performance optimization
- Add loading states and error boundaries
