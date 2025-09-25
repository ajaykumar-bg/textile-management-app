# Sidebar Module

The Sidebar module provides role-based navigation functionality for the Textile Management System, featuring dynamic menu generation, responsive design, and modular component architecture.

## Overview

This module handles the main navigation sidebar with role-specific menu items, active state management, and consistent user experience across all application views. It's designed to provide intuitive navigation based on user permissions and roles.

## Module Structure

```
components/Sidebar/
├── Sidebar.js              # Main sidebar container with drawer logic
├── SidebarHeader.js        # Header with user role information
├── SidebarNavigation.js    # Navigation list container
├── NavigationItem.js       # Individual navigation item component
├── sidebar.utils.js        # Navigation generation utilities
├── sidebar.constants.js    # Role and path constants
└── index.js                # Module exports
```

## Components

### Sidebar (Main Component)

**Purpose**: Primary navigation container managing drawer state and layout.

**Features**:

- Material-UI Drawer integration
- Keyboard navigation support (Tab/Shift handling)
- Click-outside to close functionality
- Fixed width responsive design
- Role-based content rendering

**Props**:

- `open` (boolean): Controls drawer visibility
- `onClose` (function): Callback for closing drawer

**State Management**:

- `toggleDrawer()`: Handles drawer close with keyboard support
- Event handling for proper drawer behavior
- Integration with parent component state

**Layout Structure**:

- Drawer wrapper with fixed width (250px)
- SidebarHeader for user information
- SidebarNavigation for menu items

### SidebarHeader

**Purpose**: Display user role information and navigation title.

**Features**:

- Navigation section title
- Role-based portal identification
- Consistent typography and spacing
- Visual separation with Divider

**User Information Display**:

- "Navigation" as primary title
- "{Role} Portal" as secondary text
- Capitalized role display
- Material-UI typography integration

### SidebarNavigation

**Purpose**: Container for navigation menu items with routing logic.

**Features**:

- React Router integration
- Dynamic navigation item generation
- Active route highlighting
- Click handling with callback execution

**Navigation Logic**:

- Uses `getNavigationItems()` utility for role-based items
- Integrates with React Router's `useNavigate` and `useLocation`
- Handles navigation and sidebar closing
- Active state detection based on current pathname

**Props**:

- `user` (object): User information for role-based navigation
- `onItemClick` (function): Callback for item selection

### NavigationItem

**Purpose**: Individual navigation menu item with styling and interaction.

**Features**:

- Material-UI ListItem integration
- Active state visual feedback
- Icon and text display
- Click handling for navigation

**Visual States**:

- **Active**: Primary color, bold text, highlighted icon
- **Inactive**: Default colors, normal font weight
- **Hover**: Material-UI button hover effects

**Props**:

- `item` (object): Navigation item with label, path, and icon
- `isActive` (boolean): Whether item represents current route
- `onClick` (function): Click handler for navigation

## Utilities and Constants

### sidebar.utils.js

**getNavigationItems(role)**: Generate role-based navigation items.

**Role-Based Logic**:

- **Admin**: Full access to all modules including accounting and role configuration
- **Staff**: Access to business modules (inventory, sales, purchase, production, design)
- **Customer**: Limited access to products and orders
- **All Roles**: Dashboard and settings access

**Navigation Categories**:

1. **Base Items**: Dashboard (available to all)
2. **Business Modules**: Core business functionality
3. **Customer Items**: Customer-specific views
4. **Admin Only**: Administrative functions
5. **Universal**: Settings for all users

**Return Structure**:

```javascript
[
  {
    label: 'Dashboard',
    path: '/',
    icon: <DashboardIcon />,
  },
  // ... other items based on role
];
```

### sidebar.constants.js

**Configuration Constants**:

- `ROLES`: User role definitions
- `NAVIGATION_PATHS`: Centralized path definitions
- `SIDEBAR_CONFIG`: UI configuration (width, anchor)

**Benefits**:

- Centralized path management
- Type-safe role references
- Maintainable configuration
- Easy customization

## Integration Points

### Context Dependencies

- **UserContext**: User role information for navigation generation
- **React Router**: Navigation and active route detection

### Component Dependencies

- **Material-UI Components**: Drawer, List, Typography, etc.
- **Material-UI Icons**: Navigation icons for each menu item

### Parent Integration

- **Navbar**: Receives open/close state and callbacks
- **AppRoutes**: Routing destination handling

## Key Features

### Role-Based Navigation

- Dynamic menu generation based on user role
- Permission-aware item visibility
- Consistent navigation experience per role
- Easy role configuration management

### Active State Management

- Visual feedback for current route
- Primary color highlighting
- Bold text for active items
- Icon color coordination

### Responsive Design

- Fixed width drawer (250px)
- Mobile-friendly touch interactions
- Keyboard navigation support
- Proper accessibility handling

### User Experience

- Click-outside to close
- Keyboard navigation (Tab/Shift handling)
- Smooth animations via Material-UI
- Consistent spacing and typography

## Navigation Flow

### User Interaction Flow

1. User clicks hamburger menu in Navbar
2. Sidebar opens with role-appropriate items
3. User selects navigation item
4. Route navigation occurs
5. Sidebar closes automatically
6. Active state updates for new route

### Role-Based Item Generation

1. `getNavigationItems()` called with user role
2. Base items added (Dashboard)
3. Role-specific items appended
4. Universal items added (Settings)
5. Complete navigation array returned

## Usage Example

```javascript
import Sidebar from './components/Sidebar';
import { UserProvider } from './context/UserContext';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <UserProvider>
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </UserProvider>
  );
}
```

## Styling Approach

### Material-UI Integration

- Consistent theme-based styling
- Primary color for active states
- Typography hierarchy
- Responsive breakpoints

### Visual Hierarchy

- Clear section separation with Divider
- Consistent icon and text alignment
- Proper spacing using Material-UI spacing system
- Color coordination for feedback

## Performance Considerations

- **Component Optimization**: Focused, single-responsibility components
- **Navigation Generation**: Efficient role-based filtering
- **State Management**: Minimal local state with efficient updates
- **Event Handling**: Optimized event handlers with proper cleanup

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Logical tab order
- **Semantic HTML**: Proper list and navigation semantics

## Future Enhancements

- Nested navigation menus
- Search functionality within navigation
- Bookmarks/favorites system
- Navigation history
- Customizable menu organization
- Multi-level permissions
- Dynamic navigation based on feature flags
