import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import SpecificItem from './pages/SpecificItem'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<SpecificItem />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
