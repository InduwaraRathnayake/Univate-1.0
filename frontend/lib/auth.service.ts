const API_URL = "http://localhost:8080/api/auth";

export const authService = {
  async login(email: string, password: string) {
    try {
      console.log("Sending login request:", { email }); // Debug log

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data); // Debug log

      if (response.ok && data.token) {
        localStorage.setItem("token", `Bearer ${data.token}`);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to connect to server",
      };
    }
  },

  async register(userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, message: data.message };
      }
      return { success: false, error: data.message };
    } catch (error) {
      return { success: false, error: "Failed to connect to server" };
    }
  },

  async loginWithGoogle(googleToken: string) {
    try {
      console.log("Sending Google login request:", googleToken); // Debug log

      const response = await fetch(`${API_URL}/oauth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${googleToken}`, // Sending the token in the Authorization header
        },
      });

      const data = await response.json();
      console.log("Google Login response:", data); // Debug log

      if (response.ok && data.token) {
        localStorage.setItem("token", `Bearer ${data.token}`);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true, data };
      }
      return { success: false, error: data.message };
    } catch (error) {
      console.error("Google login error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to connect to server",
      };
    }
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
