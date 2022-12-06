import "./Item.css";
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const url = 'https://images.unsplash.com/photo-1458538977777-0549b2370168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80'

function Item() {
  const { barcode } = useParams();
  const[data, setData] = useState([{}])

  useEffect(() => {
    fetch("https://pinkbird-deployment.onrender.com/ProductData?barcode="+barcode).then(
      response => response.json()
    ).then(
      data => {

        setData(data)
      }
    )
  }, [])

  const[alternates, setAlternates] = useState([])

  useEffect(() => {
    if (data?.product) {
      fetch("https://pinkbird-deployment.onrender.com/alternatives?id="+data.product[0]._id+"&category="+encodeURIComponent(data.product[0].category)).then(
        response => response.json(),
      ).then(
        responseData => {
          console.log(responseData)
          setAlternates(responseData.products)
        }
      )
    }
    
  }, [data])


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
        {(typeof alternates === 'undefined') ? (
              <p>If you're receiving this message, we're looking for your product right now! To receive product information, simply reload. If that doesn't work, then we weren't able to find your product.</p>
          ): (

              alternates?.slice(0,3).map((alter, index)=> (
                <div className="Item-Alternatives">
                  <p>
                    <Link to={"/Item/" + alter.barcode}>
                      {alter.name}
                    </Link> 
                  </p>
                </div>
                  ))
        )}
        <br></br>
      </div>
  );
}
  
export default Item;