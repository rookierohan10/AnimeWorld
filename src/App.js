import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import SpecificItem from './pages/SpecificItem'
import Collections from './pages/Collections';
import Items from './pages/Items'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<SpecificItem />}></Route>
        <Route path='/collections' element={<Collections/>}></Route>
        <Route path='/items' element={<Items/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
