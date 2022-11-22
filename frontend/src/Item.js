import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Item.css";
import item from './images/sample_item_image.jpeg';
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import productImage from './images/product.jpg'

  

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
      <img src={productImage} width = "380"/>
        {(typeof data.product === 'undefined') ? (
          <p>Loading</p>
          ) : (
            <div>
              <p>{data.product.name}</p>
              <br></br>
              <h1>Pink Tax: </h1>
              <p>${data.product.pinkTaxValue}</p>
              <br></br>
              <h1>Item Information:</h1>
              <p><b>Description:</b> {data.product.description}</p>
              <p><b>Price:</b> ${data.product.price}</p>
              <p><b>Category:</b> {data.product.category}</p>
              <br></br>
            </div>
            
          )}
        <h1>Alternatives:</h1>
      </div>
  );
}
  
export default Item;