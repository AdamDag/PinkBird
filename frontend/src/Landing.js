import logo from './images/pinkbird_logo.png'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bgImage from './images/PinkBird.png'

function Landing() {
  return (
    <div style={{ backgroundImage: `url(${bgImage})` }}>
      Hello World
    </div>
  );
}
  
export default Landing;
