import { Routes, Route } from "react-router-dom";
import Home from './pages/HomPageSteps';
import About from './pages/AboutAutismSteps';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeActivities from "./pages/HomeActivities";
import SocialStories from "./pages/SocialStories";
import HelpfulToysTools from "./pages/HelpfulToysTools";
import GovtSchemes from "./pages/GovtSchemes";

function App() {
  
  return (
   
    
     <div className="min-h-screen flex flex-col">
     <Header />
      <main className="flex-grow max-w-6xl mx-auto px-4 py-6 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/home-activities" element={<HomeActivities />} />
          <Route path="/social-stories" element={<SocialStories />} />
          <Route path="/helpful-toys-tools" element={<HelpfulToysTools />} />
          <Route path="/govt-schemes" element={<GovtSchemes />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
        <Footer />
    </div>

     
  );
}

export default App;
