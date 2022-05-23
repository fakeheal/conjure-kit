import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/App.css';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import Home from './Pages/Home';
import Integrations from './Pages/Integrations';


function App() {
  return (
    <BrowserRouter>
      <div className="w-full mx-auto lg:w-2/4">
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="integrations" element={<Integrations />}/>
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
