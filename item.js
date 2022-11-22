import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Item.css";
import item from './images/sample_item_image.jpeg';
import React, {useEffect, useState} from 'react';

  
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

function Item() {

    /*
  const[userData, setUserData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setUserData(data)
      }
    )
  }, []) */

  return (
    <ThemeProvider theme={theme}>
    <div className="ItemPage">
        <body className="item-body">
        <img src={item} alt="items"/>
        <h1>Pink Tax:</h1>
        <h3></h3>
        <br></br>
        <h2>Item Information:</h2>
        <ul>
            <li>Name: </li>
            <li>Price: </li>
            <li>Category: </li>
        </ul>
        <h1>Recommended Alternatives:</h1>

        </body>

        <footer className="item-button">
            <a href = "./Scan">
            <Button size="large" variant="contained" color="secondary" startIcon={<DocumentScannerIcon />}>
                <span className="font-link">
                Scan Another!
                </span>
            </Button>
            </a>
        </footer>
      </div>
    </ThemeProvider>
  );
}
  
export default Item;