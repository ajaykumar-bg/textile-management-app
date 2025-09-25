# Settings Component

The Settings component has been refactored into smaller, focused components following the established patterns in the textile management application.

## Component Structure

```
Settings/
├── index.js                  # Main exports
├── Settings.js              # Main container component
├── AppearanceSettings.js    # Theme selection functionality
├── ThemeOptionCard.js       # Individual theme option card
├── ThemePreview.js         # Theme preview section
└── settings.constants.js   # Theme options configuration
```

## Components

### Settings (Main Container)

- **Purpose**: Main container that orchestrates the settings layout
- **Layout**: Uses Grid system to arrange AppearanceSettings and ThemePreview
- **Responsive**: Adapts layout for different screen sizes

### AppearanceSettings

- **Purpose**: Handles theme selection functionality
- **Features**:
  - Theme option cards in responsive grid
  - Radio group for theme selection
  - Integration with ThemeContext
- **State Management**: Uses `useThemeMode` hook from ThemeContext

### ThemeOptionCard

- **Purpose**: Individual selectable theme option card
- **Props**:
  - `option`: Theme option object with value, label, description, icon
  - `isSelected`: Boolean indicating if this option is currently selected
  - `onSelect`: Callback function when card is clicked
- **Features**:
  - Interactive hover effects
  - Visual selection state
  - Icon and description display

### ThemePreview

- **Purpose**: Shows a preview of the currently selected theme
- **Features**:
  - Displays current theme name
  - Sample content with theme colors
  - Color palette preview boxes

## Constants

### settings.constants.js

- **Purpose**: Centralized configuration for theme options
- **Contents**: Array of theme objects with icons, descriptions, and values
- **Themes**: Light, Dark, and Pink themes

## Key Features

✅ **Modular Architecture**: Components are small, focused, and reusable
✅ **Responsive Design**: Uses Material-UI Grid system for adaptive layouts
✅ **Centralized Configuration**: Theme options stored in constants file
✅ **Theme Context Integration**: Seamless integration with app-wide theme system
✅ **Interactive UI**: Hover effects and visual feedback for better UX
✅ **Accessibility**: Proper form controls and semantic HTML structure

## Usage

```javascript
import Settings from './components/Settings';

// The Settings component is fully self-contained
<Settings />;
```

## Theme Context Integration

The Settings component integrates with the application's ThemeContext:

- Uses `useThemeMode` hook to get/set current theme
- Supports light, dark, and pink theme modes
- Changes are applied globally across the application
