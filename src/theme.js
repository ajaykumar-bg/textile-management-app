import { createTheme } from '@mui/material/styles';

const themeConfigs = {
  light: {
    palette: {
      mode: 'light',
    },
    scrollbar: {
      track: '#f1f1f1',
      thumb: '#c1c1c1',
      thumbHover: '#a8a8a8',
      thumbActive: '#888888',
      bodyTrack: '#f7fafc',
      bodyThumb: '#cbd5e0',
      bodyThumbHover: '#a0aec0',
    },
  },
  dark: {
    palette: {
      mode: 'dark',
    },
    scrollbar: {
      track: '#2d3748',
      thumb: '#4a5568',
      thumbHover: '#718096',
      thumbActive: '#9ca3af',
      bodyTrack: '#1a202c',
      bodyThumb: '#4a5568',
      bodyThumbHover: '#718096',
    },
  },
  pink: {
    palette: {
      mode: 'light',
      primary: {
        main: '#E60386',
        light: '#FF4DB6',
        dark: '#B3005C',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FFB3D1',
        light: '#FFE1F0',
        dark: '#CC8FA5',
        contrastText: '#000000',
      },
      background: {
        default: '#FAFAFA',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#2D2D2D',
        secondary: '#666666',
      },
    },
    scrollbar: {
      track: '#f9f9f9',
      thumb: '#E60386',
      thumbHover: '#B3005C',
      thumbActive: '#80003D',
      bodyTrack: '#f7fafc',
      bodyThumb: '#E60386',
      bodyThumbHover: '#B3005C',
    },
  },
};

const getScrollbarStyles = (config) => ({
  '*': {
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: config.track,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: config.thumb,
      borderRadius: '4px',
      border: `1px solid ${config.track}`,
      '&:hover': {
        backgroundColor: config.thumbHover,
      },
      '&:active': {
        backgroundColor: config.thumbActive,
      },
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: config.track,
    },
    scrollbarWidth: 'thin',
    scrollbarColor: `${config.thumb} ${config.track}`,
  },
  body: {
    '&::-webkit-scrollbar': {
      width: '12px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: config.bodyTrack,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: config.bodyThumb,
      borderRadius: '6px',
      border: `2px solid ${config.bodyTrack}`,
      '&:hover': {
        backgroundColor: config.bodyThumbHover,
      },
    },
  },
});

export const getTheme = (mode) => {
  const config = themeConfigs[mode] || themeConfigs.light;

  return createTheme({
    palette: config.palette,
    typography: {
      fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
      h2: {
        fontWeight: 700,
        fontSize: '1.5rem',
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.1rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1rem',
      },
      h6: {
        fontWeight: 500,
        fontSize: '0.95rem',
      },
      subtitle1: {
        fontSize: '0.95rem',
      },
      subtitle2: {
        fontSize: '0.85rem',
      },
      body1: {
        fontSize: '0.95rem',
      },
      body2: {
        fontSize: '0.85rem',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: getScrollbarStyles(config.scrollbar),
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 5,
            padding: '0.75rem',
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            '& > .MuiGrid-item': {
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            },
          },
        },
      },
    },
  });
};
