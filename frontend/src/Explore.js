import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Explore.css";
import productImage from './images/product.jpg'
import { Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Image from 'react-random-image'

const linkStyle = {
  textDecoration: "none",
  color: 'black'
};

const url = 'https://images.unsplash.com/photo-1458538977777-0549b2370168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80'

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
                  <img src={url}/>
                  <p>
                    <Link style={linkStyle} to={"/Item/" + product.barcode}>
                      {product.name}
                    </Link> 
                  </p>
                </div>
                  ))
                )}
        </>
    )}
  
export default Explore;