import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Scan from './Scan';
import Item from './Item';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Scan" element={<Scan />} />
          <Route path="/Item" element={<Item />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
