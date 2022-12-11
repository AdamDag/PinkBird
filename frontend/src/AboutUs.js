import "./AboutUs.css";
import Sonia from "./images/Sonia.png"
import Adam from "./images/Adam.png"
import Naim from "./images/Naim.png"
import Sakib from "./images/Sakib.png"

function AboutUs() {
  return (
      <div className="AboutUsPage">
       <h1>Our Team</h1>
       <img src = {Naim}/>
       <h4>Naim Mousa</h4>
       <img src = {Adam}/>
       <h4>Adam Dagnachew</h4>
       <img src = {Sonia}/>
       <h4>Sonia Jain</h4>
       <img src = {Sakib}/>
       <h4>Sakib Ahmed</h4>
      </div>

  );
}
  
export default AboutUs;