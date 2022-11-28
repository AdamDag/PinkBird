import Button from '@mui/material/Button';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import docscan from './images/docscan.jpeg'
import rethinkpink from "./images/rethinkpink.jpg"
import razor from "./images/razortax.jpeg"
import pinktax from "./images/pinktaxgeneral.png"
import Carousel from 'react-material-ui-carousel'
import './ReadMore.css'

const url1 = "https://bnblegal.com/wp-content/uploads/2022/07/Why-Women-Products-And-Services-Are-More-Expensive-Than-Men-Pink-Tax-Explained-1.jpg"
  
function ReadMore(props) {
  var items = [
    {
        imgUrl: "https://financialit.net/sites/default/files/business_what-is-pink-tax_grace-xu-1.jpg",
        name: "What is the Pink Tax?",
        description: ""
    },
    {
        imgUrl: "https://grazia.wwmindia.com/content/2021/mar/pinktax6661615331342.png",
        name: "How Are We Helping?",
        description: ""
    },
    {
        imgUrl: "https://miro.medium.com/max/720/1*rs2atE87L69xdxHXLR65dA.jpeg",
        name: "How Can You Help?",
        description: ""
    }
  ]
  return (
      <div className="ReadMorePage">
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
      </div>

  );
}

function Item(props)
{
    return (
      <div>
        <img src={props.item.imgUrl}/>
         <h2>{props.item.name}</h2>
         <p>{props.item.description}</p>
      </div>
    )
}

  
export default ReadMore;