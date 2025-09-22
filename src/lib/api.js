// Mock API for the demo
export const api = {
  login: async (credentials) => {
    // Mock successful login
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      token: "mock-token-" + Date.now(),
      user: {
        id: "user-" + Date.now(),
        name: "Demo User",
        email: credentials.email
      }
    };
  },
  
  register: async (userData) => {
    // Mock successful registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      token: "mock-token-" + Date.now(),
      user: {
        id: "user-" + Date.now(),
        name: userData.name,
        email: userData.email
      }
    };
  },
  
  googleLoginUrl: () => {
    return "/auth/google";
  }
};