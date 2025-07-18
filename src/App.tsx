import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/home";
import SourceProvider from "./components/SourceProvider";

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "16px",
          marginBottom: "16px",
          width: "100%", // fallback for xs
          "@media (min-width:600px)": {
            width: "100%",
          },
          "@media (min-width:900px)": {
            width: "48%",
          },
          "@media (min-width:1200px)": {
            width: "80%",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
          backgroundColor: "#4644ea",
          paddingTop: "32px",
          paddingBottom: "32px",
        },
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SourceProvider>
          <CssBaseline />
          <Home />
        </SourceProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
