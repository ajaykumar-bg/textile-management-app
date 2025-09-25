# Navbar Module

The Navbar module provides the main navigation interface for the Textile Management System, featuring role-based user menus, responsive design, and modular component architecture.

## Overview

This module handles the primary navigation bar with user authentication display, role switching capabilities, sidebar navigation control, and company branding. It's designed for consistent user experience across all application views.

## Module Structure

```
components/Navbar/
├── Navbar.js              # Main navigation component with layout
├── NavbarBrand.js         # Application title and branding
├── UserMenu.js            # User avatar and information display
├── UserMenuDropdown.js    # Role switching and logout menu
├── CompanyLogo.js         # Company logo display component
├── navbar.constants.js    # Role configuration and constants
├── navbar.utils.js        # Utility functions for user handling
└── index.js               # Module exports
```

## Components

### Navbar (Main Component)

**Purpose**: Primary navigation container managing layout and sidebar interaction.

**Features**:

- AppBar with Material-UI theming
- Hamburger menu for sidebar toggle
- Responsive toolbar layout
- Integration with Sidebar component
- Keyboard navigation support

**State Management**:

- `drawerOpen`: Controls sidebar visibility
- `toggleDrawer()`: Handles sidebar open/close with keyboard support
- `handleSidebarClose()`: Closes sidebar from child components

**Layout Structure**:

- Menu button (hamburger icon)
- Brand/title (flexible growth)
- User menu and company logo (right-aligned)

### NavbarBrand

**Purpose**: Display application title with consistent styling.

**Features**:

- Responsive typography scaling
- Flex-grow for responsive spacing
- Material-UI Typography integration
- Bold font weight for prominence

**Styling**:

- Uses h2 variant with custom fontSize (18px)
- Bold font weight for visual hierarchy
- Flexible width to fill available space

### UserMenu

**Purpose**: User information display and menu trigger.

**Features**:

- User avatar with initials
- User name and role display
- Responsive visibility (name hidden on mobile)
- Tooltip for accessibility
- Click handler for dropdown menu

**Components Integration**:

- Uses `getUserInitials()` utility function
- Manages dropdown state with `UserMenuDropdown`
- Responsive design with conditional rendering

**User Information Display**:

- Avatar with user initials
- Primary text: User name
- Secondary text: Capitalized user role
- Mobile-responsive text visibility

### UserMenuDropdown

**Purpose**: Role switching and user actions menu.

**Features**:

- Role switching with dynamic options
- User information header (disabled)
- Logout functionality
- Icon-based menu items
- Permission-based role availability

**Menu Structure**:

1. **User Info Section**: Disabled header with user details
2. **Role Switcher**: Dynamic role options with icons
3. **Logout Section**: Sign-out functionality

**Role Management**:

- Dynamic role generation from `ROLE_CONFIG`
- Disabled state for current role
- Icon and label configuration per role
- Integration with UserContext for role switching

### CompanyLogo

**Purpose**: Display company branding with error handling.

**Features**:

- Image loading with error fallback
- Responsive sizing (40px height)
- Console logging for debugging
- Automatic hiding on load failure

**Error Handling**:

- `onError` handler for failed image loads
- Console logging for debugging
- Graceful hiding of failed images
- Maintains layout integrity

## Constants and Utilities

### navbar.constants.js

**ROLE_CONFIG**: Centralized role configuration with icons and labels.

**Structure**:

```javascript
{
  admin: { label: 'Switch to Admin', icon: <AdminPanelSettings /> },
  staff: { label: 'Switch to Staff', icon: <Support /> },
  customer: { label: 'Switch to Customer', icon: <StorefrontOutlined /> }
}
```

**Benefits**:

- Centralized role management
- Easy addition of new roles
- Consistent iconography
- Maintainable configuration

### navbar.utils.js

**getUserInitials()**: Extract initials from user's full name.

**Features**:

- Splits name by spaces
- Takes first character of each word
- Uppercase conversion
- Maximum 2 characters output
- Handles edge cases (single name, empty strings)

## Integration Points

### Context Dependencies

- **UserContext**: User information, role switching, permissions
- **ThemeContext**: Material-UI theme integration for consistent styling

### Component Dependencies

- **Sidebar**: Navigation drawer component integration
- **Material-UI Components**: AppBar, Toolbar, Menu, Avatar, etc.

### Navigation Flow

- Hamburger menu → Sidebar component
- User menu → Role switching via UserContext
- Logo → Company branding display
- Responsive design → Mobile-first approach

## Key Features

### Role-Based Interface

- Dynamic role switching with visual feedback
- Permission-aware menu options
- Current role highlighting (disabled state)
- Context-integrated role management

### Responsive Design

- Mobile-first approach
- Conditional content display
- Flexible layout with proper spacing
- Touch-friendly interface elements

### Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- Tooltip descriptions
- Semantic HTML structure

### Error Handling

- Image loading fallback
- Graceful degradation
- Console logging for debugging
- Maintains UI integrity on failures

## Usage Example

```javascript
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Navbar />
      {/* Rest of application */}
    </UserProvider>
  );
}
```

## Styling Approach

### Material-UI Integration

- Consistent theme-based styling
- Responsive breakpoints
- Color scheme integration
- Typography hierarchy

### Layout Strategy

- Flexbox for responsive alignment
- Proper spacing with gap and margin
- Conditional visibility for mobile
- Consistent component sizing

## Performance Considerations

- **Component Optimization**: Focused, single-responsibility components
- **State Management**: Minimal local state with efficient updates
- **Event Handling**: Optimized event handlers with proper cleanup
- **Responsive Loading**: Conditional rendering for performance

## Future Enhancements

- Notification badges in user menu
- Search functionality integration
- Breadcrumb navigation support
- Multi-language support
- Advanced user preferences
- Real-time status indicators
