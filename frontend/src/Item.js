import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Item.css";
import item from './images/sample_item_image.jpeg';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import productImage from './images/product.jpg'

const url = 'https://images.unsplash.com/photo-1458538977777-0549b2370168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80'

function Item() {
  const { barcode } = useParams();
  const[data, setData] = useState([{}])

  useEffect(() => {
    fetch("/ProductData?barcode="+barcode).then(
      response => response.json()
    ).then(
      data => {

        setData(data)
      }
    )
  }, [])

  return (
    <div className="ItemPage">
        {(typeof data.product === 'undefined') ? (
          <p>Loading</p>
          ) : (
            <div>
              <img src={url} width = "380"/>
              <h2>{data.product[0].name}</h2>
              <br></br>
              <h1>Pink Tax: ${data.product[0].pinkTaxValue}</h1>
              <br></br>
              <h4>Description:</h4>
              <p> {data.product[0].description}</p>
              <br></br>
              <h4>Price:</h4>
              <p><b></b> ${data.product[0].price}</p>
              <br></br>
              <h4>Category:</h4>
              <p><b></b> {data.product[0].category}</p>
              <br></br>
            </div>
            
          )}
        <h1>Alternatives:</h1>
        <br></br>
      </div>
  );
}
  
export default Item;