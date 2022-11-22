import logo from './images/pinkbird_logo.png'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bgImage from './images/PinkBird.png'
import "./Landing.css";
import flamingo from './images/flamingo.jpg'

function Landing() {
  return (
  	<div className="LandingPageBody">
      <div className="landing-page-text">
        <h2>Scan and Save!</h2>
        <p>Scan any barcode and find it's product and the uptax caused by the Pink Tax. Then be recommended alternative products that are cheaper and not unnecessarily taxed.</p>
      </div>
      <img src={flamingo} alt="landing-page-image"/>
    </div>

    //Color Palette: https://coolors.co/707b7d-a4bfc0-a1d7d9-facccc-fbb2b3-dca1a4
  );
}
  
export default Landing;
