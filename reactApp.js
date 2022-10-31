import logo from "./logo.svg";
import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./style.css";
  
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff80ab',
    },
    secondary: {
      main: '#ffc1e3',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <span className="font-header-link">
            PinkBird
          </span>
        </header>
        <body className="App-body">
          <Button size="large" variant="contained" color="secondary" startIcon={<DocumentScannerIcon />}>
            <span className="font-link">
            Scan
            </span>
          </Button>
        </body>
      </div>
    </ThemeProvider>
  );
}
  
export default App;