import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Explore.css";
import docscan from './images/docscan.jpeg'
import productImage from './images/product.jpg'
import female from './images/femaleproducts.jpeg'
import hygiene from './images/hygiene.jpeg'
import stationary from './images/stationary.jpeg'
import { Link } from 'react-router-dom';
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
              data.products?.map((product, index)=> (
                <div className="Explore-body">
                  <img src={productImage} width = "380"/>
                  <p>
                    <Link to={"/Item/" + product.barcode}>{product.name}</Link> 
                  </p>
                </div>
                  ))
                )}
        </>
    )}
  
export default Explore;