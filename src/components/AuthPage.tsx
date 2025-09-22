import { useState } from "react";
import { api } from "@/lib/api.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Github,
  Chrome,
  Code,
  Star,
  Database,
  Terminal,
  Layers,
  User,
} from "lucide-react";
import { useTheme } from "@/theme-context.jsx";

export function AuthPage({ onLogin, onBackToHome }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme } = useTheme();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      let data;
      if (isLogin) {
        data = await api.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        data = await api.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
      }
      const { token, user } = data;
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        onLogin(user);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (e) {
      const msg =
        (e && e.data && (e.data.error || e.data.message)) ||
        e.message ||
        "Authentication failed. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    const user = {
      id: "google-user-" + Date.now(),
      name: "Google User",
      email: "user@google.com",
    };
    localStorage.setItem("token", "google-token-" + Date.now());
    localStorage.setItem("user", JSON.stringify(user));
    onLogin(user);
  };

  const handleGithubAuth = () => {
    const user = {
      id: "github-user-" + Date.now(),
      name: "GitHub User",
      email: "user@github.com",
    };
    localStorage.setItem("token", "github-token-" + Date.now());
    localStorage.setItem("user", JSON.stringify(user));
    onLogin(user);
  };

  const floatingElements = [
    { icon: Code, color: "text-accent/40", size: "w-6 h-6", top: "20%", left: "16%", delay: "0s", duration: "6s" },
    { icon: Star, color: "text-yellow-500/40", size: "w-5 h-5", top: "32%", left: "80%", delay: "1s", duration: "8s" },
    { icon: Terminal, color: "text-primary/40", size: "w-4 h-4", top: "64%", left: "32%", delay: "2s", duration: "7s" },
    { icon: Database, color: "text-purple-500/40", size: "w-5 h-5", top: "48%", left: "85%", delay: "0.5s", duration: "9s" },
    { icon: Layers, color: "text-teal-500/40", size: "w-6 h-6", top: "75%", left: "20%", delay: "1.5s", duration: "6.5s" },
    { icon: Code, color: "text-orange-500/40", size: "w-4 h-4", top: "85%", left: "70%", delay: "3s", duration: "8.5s" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden relative">
      {/* Animated background with floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating tech icons */}
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon;
          return (
            <div
              key={index}
              className="absolute animate-float"
              style={{
                top: element.top,
                left: element.left,
                animationDelay: element.delay,
                animationDuration: element.duration,
              }}
            >
              <IconComponent className={`${element.size} ${element.color}`} />
            </div>
          );
        })}

        {/* Geometric shapes */}
        <div className="absolute top-40 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse-glow" />
        <div className="absolute top-72 right-1/4 w-3 h-3 bg-accent/30 rotate-45 animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-1/3 w-1 h-1 bg-accent/40 rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="glass"
          onClick={onBackToHome}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Brand messaging */}
          <div className="text-center lg:text-left animate-slide-in-up">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm font-medium glass animate-pulse-glow text-foreground"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Welcome to the Future
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Cloud Native
              <span className="block gradient-text animate-gradient bg-[length:200%_auto]">
                Developer Workspace
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Code, collaborate, and create in the cloud. Your complete
              development environment, powered by AI, accessible from anywhere.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {[
                { icon: <Sparkles className="w-5 h-5" />, text: "AI-Powered" },
                { icon: <Database className="w-5 h-5" />, text: "Cloud Native" },
                { icon: <Terminal className="w-5 h-5" />, text: "Full Terminal" },
                { icon: <Layers className="w-5 h-5" />, text: "Docker Ready" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="text-primary">{feature.icon}</div>
                  {feature.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Auth form */}
          <div
            className="w-full max-w-md mx-auto animate-slide-in-up"
            style={{ animationDelay: ".2s" }}
          >
            <Card className="glass-strong border-2 border-primary/20 shadow-2xl shadow-primary/10 hover-lift">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  {isLogin ? "Welcome Back" : "Get Started"}
                </CardTitle>
                <p className="text-muted-foreground">
                  {isLogin
                    ? "Sign in to access your workspace"
                    : "Join thousands of developers coding in the cloud"}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tab switcher */}
                <div className="flex rounded-lg bg-muted p-1">
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      isLogin
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsLogin(true)}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      !isLogin
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Error message */}
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                    {error}
                  </div>
                )}

                {/* Auth form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 glass border-primary/20 focus:border-primary/40"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 glass border-primary/20 focus:border-primary/40"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 glass border-primary/20 focus:border-primary/40"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="pl-10 pr-10 glass border-primary/20 focus:border-primary/40"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processing..."
                      : isLogin
                      ? "Sign In"
                      : "Create Account"}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social auth buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="glass"
                    onClick={handleGoogleAuth}
                    className="border-primary/20 hover:border-primary/40"
                  >
                    <Chrome className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="glass"
                    onClick={handleGithubAuth}
                    className="border-primary/20 hover:border-primary/40"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>

                {/* Forgot password link */}
                {isLogin && (
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}