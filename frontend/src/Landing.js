import Button from '@mui/material/Button';
import "./Landing.css";
import flamingo from './images/flamingo.png'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'

function Landing(props) {
  var items = [
    {
        name: "PinkBird",
        description: "Putting an end to the Pink Tax one product at a time"
    },
    {
        name: "Scan and Save",
        description: "Scan a product's barcode and receive alternative options at a lower price"
    },
    {
      name: "Explore",
      description: "Explore products to find alternatives that don't have a Pink Tax"
    }
]

  return (
  	<div className="LandingPageBody">
      <img src={flamingo} alt="landing-page-image"/>
      <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
      </Carousel>
      <Button variant="contained" className="LandingPageButton" sx={{
        borderRadius: 50
      }}>
        <Link to ="/Scan">
          <p><b>Let's Get Started</b></p>
        </Link>
      </Button>

    </div>

    //Color Palette: https://coolors.co/707b7d-a4bfc0-a1d7d9-facccc-fbb2b3-dca1a4
  );
}

function Item(props)
{
    return (
      <div>
         <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
      </div>
    )
}

  
export default Landing;
