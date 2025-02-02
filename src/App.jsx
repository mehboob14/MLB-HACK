import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Heropage from "./components/Heropage";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import VideoAnalyzer from "./components/VideoAnalyzer";
import Demo from "./components/Demo";
import About from "./components/About";
function App() {
  const [uploadedVideo, setUploadedVideo] = useState(""); // Global state

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Heropage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/VideoAnalyzer" element={<VideoAnalyzer setUploadedVideo={setUploadedVideo} />} />
          <Route path="/Demo" element={<Demo uploadedVideo={uploadedVideo} />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
