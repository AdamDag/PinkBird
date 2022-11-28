import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Scan from './Scan';
import Item from './Item';
import Explore from './Explore';
import ReadMore from './ReadMore';
import AboutUs from './AboutUs';
import Landing from './Landing';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Scan" element={<Scan />} />
          <Route path="/Item/:barcode" element={<Item />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/ReadMore" element={<ReadMore />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </Router>

      <BottomNavBar />
    </div>
  );
}

export default App;
