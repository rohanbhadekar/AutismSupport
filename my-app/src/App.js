import { Routes, Route } from "react-router-dom";
import Home from './pages/HomPageSteps';
import About from './pages/AboutAutismSteps';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeActivities from "./pages/HomeActivities";
import GovtSchemes from "./pages/GovtSchemes";
import SocialStoryStepCards from "./pages/SocialStoryStepCards";
import DebugToken from "./DebugToken";
import QaListPage from "./pages/QaListPage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import ArticlesList from "./pages/ArticlesList";
import ArticlesDetails from "./pages/ArticleDetail";

function App() {
  
  return (
   
    
     <div className="min-h-screen flex flex-col">
     <Header />
     <main className="flex-grow max-w-6xl mx-auto px-4 pt-2 pb-4 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/home-activities" element={<HomeActivities />} />
          <Route path="/social-stories" element={<SocialStoryStepCards  />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/govt-schemes" element={<GovtSchemes />} />
          <Route path="/debugtoken" element={<DebugToken />} />         
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
          <Route path="/qa" element={<QaListPage />} />
          <Route path="/qa/:id" element={<QuestionDetailPage />} />
          <Route path="/articles/:id" element={<ArticlesDetails />} />
        </Routes>
      </main>
        <Footer />
    </div>

     
  );
}

export default App;
