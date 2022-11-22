import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Explore.css";
import docscan from './images/docscan.jpeg'
import Header from './Header'
import male from './images/maleproducts.jpg'
import female from './images/femaleproducts.jpeg'
import hygiene from './images/hygiene.jpeg'
import stationary from './images/stationary.jpeg'
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

function Explore() {
    const[data, setData] = useState([])

    useEffect(() => {
      fetch("/ProductData").then(
        response => response.json()
      ).then(
        data => {
          setData(data)
        }
      )
    }, [])

    return (
        <>
          {(typeof data.products === 'undefined') ? (
              <p>Loading</p>
          ): (
              data.products?.slice(0,3).map((product, index)=> (
                <p>{product[0]}</p>
                  ))
                )}
        </>
    )}
  
export default Explore;