export const authService = {
  async login(email: string, password: string) {
    try {
      console.log("Sending login request:", { email }); // Debug log

      const response = await fetch(`${process.env.API_URL}/auth/login`, {
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
      const response = await fetch(`${process.env.API_URL}/auth/register`, {
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
      return { success: false, error: `Failed to connect to server ${error}` };
    }
  },

  async loginWithGoogle(googleAuthData: any) {
    try {
      console.log("Google credential response:", googleAuthData);

      const response = await fetch(`${process.env.API_URL}/auth/oauth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: googleAuthData }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (data.token && data.user) {
        localStorage.setItem("token", `Bearer ${data.token}`);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true, message: data.message };
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

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
