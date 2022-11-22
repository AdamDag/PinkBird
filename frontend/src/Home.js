import logo from './images/pinkbird_logo.png'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Home.css";
import bgImage from './images/PinkBird.png'

  
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

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div className="HomePage">
        <header className = "home-header">
          <img src={bgImage} alt="Our Logo"/>
        </header>
        <body className="HomePage-body">
          <a href = "./Scan">
            <Button size="large" variant="contained" color="secondary" className= "home-page-button">
              <span className="font-link">
              Let's Begin!
              </span>
            </Button>
          </a>
        </body>
      </div>
    </ThemeProvider>
  );
}
  
export default Home;
