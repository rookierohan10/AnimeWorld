import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import SpecificItem from './pages/SpecificItem'
import Collections from './pages/Collections';
import Items from './pages/Items'
import LoginRoute from './Components/LoginRoute';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {
          <LoginRoute >
            <Home />
          </LoginRoute>
        } />
        <Route path="/product" element={<SpecificItem />}></Route>
        <Route path='/collections' element={<Collections/>}></Route>
        <Route path='/items' element={<Items/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
