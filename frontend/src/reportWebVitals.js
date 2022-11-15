import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Scan.css";
import docscan from './images/docscan.jpeg'


function Scan() {
  return (
  	 <header className="Scan-header">
          <span className="font-header-link">
            PinkBird
          </span>
          <nav>
            <ul>
              <li><a href = "./Home">Home</a></li>
              <li><a href = "./Scan">Scan</a></li>
              <li>Explore</li>
            </ul>
          </nav>
        </header>

  );
}
  
export default Scan;