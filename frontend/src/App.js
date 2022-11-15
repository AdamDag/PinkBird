import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Scan from './Scan';
import Item from './Item';
import Explore from './Explore';
import ReadMore from './ReadMore';
import AboutUs from './AboutUs';
import Landing from './Landing';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Landing" element={<Landing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Scan" element={<Scan />} />
          <Route path="/Item" element={<Item />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/ReadMore" element={<ReadMore />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
