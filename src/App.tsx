import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingPage from "@/pages/LandingPage";
import DashboardPage from "@/pages/DashboardPage";
import ExplorePage from "@/pages/ExplorePage";
import TalkDetailsPage from "@/pages/TalkDetailsPage";
import ProfilePage from "@/pages/ProfilePage";
import AIAssistant from "@/components/AIAssistant";
import AIRoadmapPage from "@/pages/AIRoadmapPage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div
          className="min-h-screen flex flex-col"
          style={{ background: "var(--bg-base)" }}
        >
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/talk/:id" element={<TalkDetailsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/ai-roadmap" element={<AIRoadmapPage />} />
            </Routes>
          </main>
          <AIAssistant />
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
