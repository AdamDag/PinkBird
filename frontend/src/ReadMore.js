import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import docscan from './images/docscan.jpeg'
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
      <div className="ReadMorePage">
        <body className="ReadMore-body">
            <h1>What is the Pink Tax?</h1>
            <h1>How Are We Helping?</h1>
        </body>
      </div>
    </ThemeProvider>

  );
}
  
export default ReadMore;