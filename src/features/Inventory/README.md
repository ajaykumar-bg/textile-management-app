# Inventory Module

The Inventory module provides comprehensive inventory management capabilities for textile businesses, offering real-time stock tracking, warehouse management, and multi-view data visualization.

## Overview

This module manages both raw materials (fabrics) and finished products, providing role-based access control, filtering capabilities, and detailed analytics through charts and statistics.

## Module Structure

```
features/Inventory/
├── Inventory.js              # Main component with tabs and state management
├── InventoryHeader.js        # Header with actions (Add, Export)
├── InventoryFilters.js       # Search and filter controls
├── InventoryTable.js         # Sortable table view with permissions
├── InventoryCard.js          # Individual item card component
├── InventoryGrid.js          # Grid layout for cards
├── StockOverview.js          # Analytics dashboard with charts
├── StockMovements.js         # Stock movement history tracking
├── TabPanel.js               # Reusable tab panel wrapper
├── constants.js              # Mock data and configuration
└── index.js                  # Module exports
```

## Components

### Inventory (Main Component)

**Purpose**: Central orchestrator managing tabs, state, and sub-component coordination.

**Features**:

- Three-tab navigation: Overview, Inventory Items, Stock Movements
- Unified state management for search, filters, and view modes
- Permission-based action handling
- Item lifecycle operations (view, edit, delete, add)

**State Management**:

- `tabValue`: Active tab index
- `searchTerm`: Text search across items
- `categoryFilter`: Category-based filtering
- `statusFilter`: Status-based filtering
- `viewMode`: Toggle between cards/table view

**Key Methods**:

- `handleTabChange()`: Tab navigation
- `handleAddItem()`: Add new inventory item
- `handleEditItem()`: Edit existing item
- `handleDeleteItem()`: Remove item from inventory
- `handleViewDetails()`: View detailed item information
- `handleExport()`: Export inventory data

### InventoryHeader

**Purpose**: Action bar providing primary inventory operations.

**Features**:

- Permission-controlled Add Item button
- Export functionality for inventory data
- Consistent header styling with title

### InventoryFilters

**Purpose**: Comprehensive filtering and search interface.

**Features**:

- Real-time text search with search icon
- Category dropdown with dynamic options
- Status dropdown with dynamic options
- View mode toggle (Cards/Table)
- Live filtered results counter
- Responsive grid layout

**Filter Logic**:

- Combines search term matching (name/ID)
- Category and status filtering
- Case-insensitive search
- Dynamic filter option generation

### InventoryTable

**Purpose**: Sortable tabular view of inventory items.

**Features**:

- Multi-column sorting with TableSortLabel
- Status chips with color coding
- Permission-based action buttons
- Responsive table design
- Numeric and string value sorting

**Sortable Columns**:

- Item Code, Name, Category
- Current Stock, Status, Unit Price
- Total Value, Location

**Sorting Implementation**:

- Handles numeric values (stock, price, value)
- String comparison with case normalization
- Ascending/descending toggle
- Visual sort indicators

### InventoryCard

**Purpose**: Visual card representation for individual items.

**Features**:

- Status indicator with color coding
- Stock level progress bars
- Action menu with permissions
- Responsive card design
- Key metrics display

### InventoryGrid

**Purpose**: Grid layout manager for inventory cards.

**Features**:

- Responsive grid system
- Consistent card spacing
- Empty state handling
- Performance optimization for large datasets

### StockOverview

**Purpose**: Analytics dashboard with comprehensive inventory insights.

**Features**:

- **Statistics Grid**: Total items, low stock alerts, total value, utilization rate
- **Chart Visualizations**:
  - Bar Chart: Stock levels comparison (current vs minimum)
  - Pie Chart: Category distribution
- **Warehouse Utilization**: Progress bars with color-coded thresholds
- Role-based data filtering
- Real-time calculations from inventory data

**Chart Integration**:

- Uses @mui/x-charts for PieChart and BarChart
- Custom color configurations
- Interactive chart elements
- Responsive chart sizing

### StockMovements

**Purpose**: Track and display inventory movement history.

**Features**:

- Movement type categorization (Inbound, Outbound, Production)
- Color-coded movement indicators
- Reference tracking (PO, SO, Production numbers)
- Historical movement records

### TabPanel

**Purpose**: Reusable tab content wrapper.

**Features**:

- Conditional rendering based on active tab
- Consistent padding and styling
- Accessibility support

## Data Management

### Constants Structure

- **Inventory Data**: Fabrics and products with comprehensive details
- **Categories**: Dynamic category management with counts/values
- **Suppliers**: Supplier information with contact details
- **Movements**: Stock movement tracking with references
- **Warehouses**: Location management with utilization metrics

### Status Management

- **Status Colors**: Mapped color coding for different statuses
- **Movement Colors**: Type-specific color schemes
- **Chart Configurations**: Centralized styling for visualizations

## Integration Points

### Context Dependencies

- **UserContext**: Role-based permissions and user information
- **ThemeContext**: Consistent theming across components

### Permission System

- `canManageInventory`: Controls edit/delete operations
- Role-based data filtering in overview dashboard
- Action button visibility based on permissions

## Key Features

### Multi-View Support

- **Cards View**: Visual, information-rich card layout
- **Table View**: Dense, sortable tabular format
- **Overview Dashboard**: Analytics with charts and statistics

### Advanced Filtering

- Real-time text search across name and ID
- Multi-attribute filtering (category, status)
- Dynamic filter options based on available data
- Live result counter

### Data Visualization

- Interactive charts using @mui/x-charts
- Statistical overview cards
- Progress indicators for stock levels
- Color-coded status indicators

### Responsive Design

- Mobile-first responsive layout
- Adaptive grid systems
- Flexible component sizing
- Touch-friendly interactions

## Usage Example

```javascript
import Inventory from './features/Inventory';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Inventory />
    </UserProvider>
  );
}
```

## Performance Considerations

- **Memoization**: useMemo for filtered and sorted data
- **Component Optimization**: Efficient re-rendering patterns
- **Large Dataset Handling**: Optimized for inventory scalability
- **Chart Performance**: Efficient data transformation for visualizations

## Future Enhancements

- Real-time stock updates
- Advanced reporting capabilities
- Barcode scanning integration
- Automated reorder notifications
- Multi-warehouse management
- Integration with external inventory systems
