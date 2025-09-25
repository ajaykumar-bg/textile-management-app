# RoleConfiguration Component

The RoleConfiguration component has been refactored into smaller, focused components following the established patterns in the textile management application.

## Component Structure

```
RoleConfiguration/
├── index.js                  # Main exports
├── RoleConfiguration.js      # Main container component
├── UserInformation.js        # Current user display
├── RoleManagement.js         # Role switching functionality
├── CurrentPermissions.js     # Current user permissions grid
├── RoleComparison.js         # Permission comparison table
├── RoleDetails.js           # Role access details cards
├── role.constants.js        # Role and permission configuration
└── README.md               # Component documentation
```

## Components

### RoleConfiguration (Main Container)

- **Purpose**: Main container that orchestrates the role configuration layout
- **Layout**: Uses Grid system to arrange all role management components
- **Responsive**: Adapts layout for different screen sizes

### UserInformation

- **Purpose**: Displays current user information and role
- **Features**:
  - User name, email, and current role
  - Role-specific icons and colors
  - Dynamic role chip styling
- **Integration**: Uses `useUser` hook from UserContext

### RoleManagement

- **Purpose**: Handles role switching functionality
- **Features**:
  - Interactive role switching buttons
  - Role descriptions and explanations
  - Visual feedback for current role
  - Alert for immediate role change effects
- **State Management**: Uses `switchRole` function from UserContext

### CurrentPermissions

- **Purpose**: Displays current user's permissions in a visual grid
- **Features**:
  - Permission cards with enabled/disabled states
  - Color-coded permission status
  - Responsive grid layout
- **Data**: Uses permissions from UserContext and labels from constants

### RoleComparison

- **Purpose**: Compares permissions across all roles in a table format
- **Features**:
  - Interactive table with role comparison
  - Legend for permission levels
  - Visual indicators for access levels (Full/View/None)
  - Hover effects for better UX
- **Logic**: Complex permission calculation for different roles

### RoleDetails

- **Purpose**: Shows detailed access information for each role
- **Features**:
  - Role-specific access cards
  - Color-coded role categories
  - Feature lists for each role
- **Design**: Uses role-specific themes and colors

## Constants

### role.constants.js

- **Purpose**: Centralized configuration for roles and permissions
- **Contents**:
  - `permissionLabels`: Human-readable permission names
  - `adminOnlyPermissions`: Permissions exclusive to admin role
  - `roleDescriptions`: Role descriptions for UI
  - `roleAccessDetails`: Detailed role access information with styling

## Key Features

✅ **Modular Architecture**: Components are small, focused, and reusable
✅ **Role-Based Security**: Comprehensive permission management system
✅ **Interactive UI**: Real-time role switching and permission updates
✅ **Visual Feedback**: Color-coded permissions and role states
✅ **Responsive Design**: Adapts to different screen sizes
✅ **Centralized Configuration**: All role data stored in constants
✅ **User Context Integration**: Seamless integration with authentication system

## Permission System

### Admin Role

- **Access**: Full system access
- **Permissions**: All modules including financial management
- **Color Theme**: Red (error color)
- **Icon**: AdminPanelSettings

### Staff Role

- **Access**: Operational modules
- **Permissions**: Inventory, Sales, Purchase, Production, Design
- **Restrictions**: No accounting, user management, or financial access
- **Color Theme**: Orange (warning color)
- **Icon**: Support

### Customer Role

- **Access**: Limited self-service
- **Permissions**: Dashboard view, order management (view-only for some modules)
- **Restrictions**: No operational or administrative access
- **Color Theme**: Blue (primary color)
- **Icon**: StorefrontOutlined

## Usage

```javascript
import RoleConfiguration from './components/RoleConfiguration';

// The RoleConfiguration component is fully self-contained
<RoleConfiguration />;
```

## UserContext Integration

The RoleConfiguration component integrates with the application's UserContext:

- Uses `useUser` hook to get current user and permissions
- Supports real-time role switching with `switchRole` function
- Changes are applied globally across the application
- Permission updates are reflected immediately in the UI

## Testing Role Changes

The component provides an interactive way to test different permission levels:

1. Switch between Admin, Staff, and Customer roles
2. View real-time permission changes
3. See how different roles affect dashboard visibility
4. Compare access levels across all roles in the comparison table
