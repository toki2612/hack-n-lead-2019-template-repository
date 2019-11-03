import { createMuiTheme } from '@material-ui/core/styles'

import './AppTheme.css'

export const appTheme = createMuiTheme({

  palette: {
    type: 'light',
    text: {
      primary: '#fff',
      secondary: '#0f4de0'
    },
    primary: {
      light: '#90aca6',
      main: '#fff',
      dark: '#37514b',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#fce677',
      main: '#0f4de0',
      dark: '#b09c3b',
      contrastText: '#000000'
    },
    error: {
      light: '#c46d81',
      main: '#b64962',
      dark: '#7f3344',
      contrastText: '#ffffff'
    }
  },

  typography: {
    fontFamily: [
      'Nunito'
    ].join(','),
    h6: {
      fontSize: '1.125rem',
      lineHeight: '1.375rem',
      fontWeight: 'bold'
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 'bold'
    }
  }
})
