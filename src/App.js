import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import SpecificItem from './pages/SpecificItem'
import Collections from './pages/Collections';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<SpecificItem />}></Route>
        <Route path='/collections' element={<Collections/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
