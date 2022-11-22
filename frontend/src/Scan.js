import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Scan.css";
import docscan from './images/docscan.jpeg'

  
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

function Scan() {
  return (
    <ThemeProvider theme={theme}>
      <div className="ScanPage">
        <header className="Scan-header">
          <span className="font-header-link">
            PinkBird
          </span>
        </header>
        <img src={docscan} alt="Doc Scan"/>
        <body className="Scan-body">
            <a href = "./Item">
                <Button size="large" variant="contained" color="secondary" startIcon={<DocumentScannerIcon />}>
                    <span className="font-link">
                    Scan
                    </span>
                </Button>
            </a>
        </body>
      </div>
    </ThemeProvider>

  );
}
  
export default Scan;
