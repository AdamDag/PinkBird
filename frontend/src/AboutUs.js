import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import docscan from './images/docscan.jpeg'
import "./AboutUs.css";

function AboutUs() {
  return (
      <div className="ScanPage">
        <header className="Scan-header">
          <span className="font-header-link">
            PinkBird
          </span>
          <nav>
            <ul>
              <li><a href = "./AboutUs">About Us</a></li>
              <li><a href = "./ReadMore">Read More</a></li>
              <li><a href = "./Explore">Explore</a></li>
              <li><a href = "./Scan">Scan</a></li>
            </ul>
          </nav>
        </header>
        <body className="Scan-body">
            <h1>Our Mission</h1>
            <h1>Meet The Team</h1>
        </body>
      </div>

  );
}
  
export default AboutUs;