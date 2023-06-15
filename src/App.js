import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Footer } from 'flowbite-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/App.css';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import GetStarted from './Pages/GetStarted';
import Home from './Pages/Home';
import Integrations from './Pages/Integrations';
import RescueTime from './Pages/Integrations/RescueTime';
import Tools from './Pages/Tools';
import BillableTimeTracking from './Pages/Tools/BillableTimeTracking';
import CredentialsProvider from './Providers/CredentialsProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="w-full mx-auto lg:w-3/4 h-screen py-2">
          <Navbar />
          <div className="container mx-auto flex flex-col py-2 sm:py-4">
            <CredentialsProvider>
              <Routes>
                <Route index element={<Home />} />
                <Route path="integrations" element={<Integrations />} />
                <Route path="tools" element={<Tools />} />
                <Route path="integrations/rescue-time" element={<RescueTime />} />
                <Route path="tools/billable-time-tracking" element={<BillableTimeTracking />} />
                <Route path="about" element={<About />} />
                <Route path="get-started" element={<GetStarted />} />
              </Routes>
            </CredentialsProvider>
          </div>
          <Footer className="sticky top-[100vh] !shadow-none !px-0 border-t border-gray-200 flex !justify-center">
            <Footer.LinkGroup className="mt-3 flex-wrap items-center text-sm sm:mt-0">
              <Footer.Link href="/about">
                About
              </Footer.Link>
              <Footer.Link href="/tools">
                Tools
              </Footer.Link>
              <Footer.Link href="/integrations">
                Integrations
              </Footer.Link>
              <Footer.Link href="https://github.com/fakeheal/conjure-kit">
                Github
              </Footer.Link>
            </Footer.LinkGroup>
          </Footer>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
