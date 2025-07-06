import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/home';

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components:{
     MuiCard: {
    styleOverrides: {
      root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '16px',
        marginBottom: '16px',
        width: '100%', // fallback for xs
        '@media (min-width:600px)': {
          width: '100%',
        },
        '@media (min-width:900px)': {
          width: '45%',
        },
        '@media (min-width:1200px)': {
          width: '30%',
        },
      },
    },
  },
  }
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Home/>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
