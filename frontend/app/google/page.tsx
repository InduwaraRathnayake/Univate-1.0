'use client';
import React from 'react'
import { use, useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const page = () => {
  useEffect(() => {
      // Load Google's Sign-In script
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
  
      // Initialize Google Sign-In
      window.onload = () => {
        window.google.accounts.id.initialize({
          client_id: "331098794690-djjan66pid5h1ca1gi6p3fo31d712gj1.apps.googleusercontent.com",
          callback: handleGoogleResponse,
        });
  
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          {
            theme: "outline",
            size: "large",
          }
        );
      };
    }, []);
  
    const handleGoogleResponse = (response: any) => {
      console.log("Google credential response:", response.credential);
  
      // Send the credential token to your backend
      fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Backend response:", data))
        .catch((error) => console.error("Error:", error));
    };
  
    return (
      <div className="container items-center justify-center flex min-h-screen">
        <h1>Login with Google</h1>
        <div id="googleSignInButton"></div>
      </div>
    );
}

export default page
