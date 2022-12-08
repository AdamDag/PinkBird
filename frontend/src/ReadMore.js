import Carousel from 'react-material-ui-carousel'
import './ReadMore.css'

const url1 = "https://bnblegal.com/wp-content/uploads/2022/07/Why-Women-Products-And-Services-Are-More-Expensive-Than-Men-Pink-Tax-Explained-1.jpg"
  
function ReadMore(props) {
  var items = [
    {
        name: "What is the Pink Tax?",
        description: "The Pink Tax is the mark up on products or services that are marketed towards women in which men generally pay less for similar products and services. While it's not a governmentally enforced tax, companies have charged higher prices for goods and services that functionally work just as well as men's products, but are 'designed for women'. While the Pink Tax doesn't apply to menstrual products (don't worry, there's another tax regarding that) and makeup products, it covers many other products, prominently influencing the pricing of general hygiene products such as razors or deoderant."
    },
    {
        name: "How Are We Helping?",
        description: "Our application aims to target items that have been 'pink taxed' and offer a variety of similar options, so that all of our users can benefit from normal pricing for their every day needs. We hope that we can make a valuable difference in the day-to-day lives of our consumers!   ",
        padding: "h"
    }
  ]
  return (
      <div className="ReadMorePage">
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        <br></br>
      </div>

  );
}

function Item(props)
{
    return (
      <div>
         <h2>{props.item.name}</h2>
         <p>{props.item.description}</p>
         <h1>{props.item.padding}</h1>
      </div>
    )
}

  
export default ReadMore;