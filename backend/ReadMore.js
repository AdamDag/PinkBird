import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Scan.css";
import docscan from './images/docscan.jpeg'
import Header from './Header'
import rethinkpink from "./images/rethinkpink.jpg"
import razor from "./images/razortax.jpeg"
import pinktax from "./images/pinktaxgeneral.png"

  
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

function ReadMore() {
  return (
    <ThemeProvider theme={theme}>
      <div className="ScanPage">
        <header className="Scan-header">
          <span className="font-header-link">
            PinkBird
          </span>
          <nav>
            <ul>
              <li><a href = "./Scan">Scan</a></li>
              <li><a href = "./Explore">Explore</a></li>
              <li><a href = "./Explore">Read More</a></li>
              <li><a href = "./Explore">About Us</a></li>
            </ul>
          </nav>
        </header>
        <img src={docscan} alt="Doc Scan"/>
        <body className="Scan-body">
            <img src={pinktax} alt="Our Logo"/>
            <img src={razor} alt="Our Logo"/>
            <img src={rethinkpink} alt="Our Logo"/>
        </body>
      </div>
    </ThemeProvider>

  );
}
  
export default ReadMore;