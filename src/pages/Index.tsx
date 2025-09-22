import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { AuthPage } from "@/components/AuthPage";
import { ThemeProvider } from "@/theme-context.jsx";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [user, setUser] = useState(null);

  const handleGetStarted = () => {
    setCurrentPage("auth");
  };

  const handleLogin = (userData) => {
    setUser(userData);
    // In a real app, you'd redirect to the dashboard/workspace
    console.log("User logged in:", userData);
    alert(`Welcome ${userData.name}! You would now be redirected to your workspace.`);
  };

  const handleBackToHome = () => {
    setCurrentPage("landing");
  };

  const handleLoginClick = () => {
    setCurrentPage("auth");
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {currentPage === "landing" && (
          <LandingPage 
            onGetStarted={handleGetStarted}
            onLogin={handleLoginClick}
          />
        )}
        {currentPage === "auth" && (
          <AuthPage 
            onLogin={handleLogin}
            onBackToHome={handleBackToHome}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;