import { Footer } from 'flowbite-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/App.css';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import GetStarted from './Pages/GetStarted';
import Home from './Pages/Home';
import Integrations from './Pages/Integrations';


function App() {
  return (
    <BrowserRouter>
      <div className="w-full mx-auto lg:w-2/4 h-screen py-2">
        <Navbar />
        <div className="container mx-auto flex flex-col items-center py-4 sm:py-10">
          <Routes>
            <Route index element={<Home />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="about" element={<About />} />
            <Route path="get-started" element={<GetStarted />} />
          </Routes>
        </div>
        <Footer className="sticky top-[100vh] shadow-none">
          <Footer.Copyright
            href="/"
            by="Conjure Kit™"
            year={2022}
          />
          <Footer.LinkGroup className="mt-3 flex-wrap items-center text-sm sm:mt-0">
            <Footer.Link href="/about">
              About
            </Footer.Link>
            <Footer.Link href="/">
              Integrations
            </Footer.Link>
            <Footer.Link href="https://github.com/fakeheal/conjure-kit">
              Github
            </Footer.Link>
          </Footer.LinkGroup>
        </Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
