import logo from './images/pinkbird_logo.png'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Home.css";
  
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
        <img src={logo} alt="Our Logo"/>
          <h1>PinkBird</h1>
          <h3>The app designed to calculate a <br></br>Pink Tax on any product.</h3>
        </header>
        <body className="HomePage-body">
          <a href = "./Scan">
            <Button size="large" variant="contained" color="secondary" className= "home-page-button">
              <span className="font-link">
              Let's Get Started
              </span>
            </Button>
          </a>
        </body>
      </div>
    </ThemeProvider>
  );
}
  
export default Home;
