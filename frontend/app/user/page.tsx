"use client";

import Button from "@/components/ui/button";
import { authService } from "@/lib/auth.service";
import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notificationPreference, setNotificationPreference] = useState(false);

  const route = useRouter();

  const user = {
    name: "John Doe",
    bio: "Passionate developer and tech enthusiast",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900 bg-opacity-100 overflow-y-auto h-full w-full flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md animate-fade-in-down">
        <div className="flex items-start mb-6">
          <img
            src={user.image}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-blue-200 hover:border-blue-300 transition-all duration-300"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 mt-1">
              {user.bio.length > 100
                ? `${user.bio.substring(0, 97)}...`
                : user.bio}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 ${
                activeTab === "contact"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("contact")}
            >
              Contact Info
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "settings"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>
        </div>

        {activeTab === "contact" && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                <FaEnvelope className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                  !validateEmail(email) && email ? "border-red-300" : ""
                }`}
                placeholder="Enter your email"
              />
              {!validateEmail(email) && email && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                <FaPhone className="inline mr-2" />
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                  !validatePhone(phone) && phone ? "border-red-300" : ""
                }`}
                placeholder="Enter your phone number"
              />
              {!validatePhone(phone) && phone && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid phone number.
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500 hover:text-blue-600">
                <FaGithub className="inline mr-1" /> GitHub
              </a>

              <a href="#" className="text-blue-500 hover:text-blue-600">
                <FaLinkedin className="inline mr-1" /> LinkedIn
              </a>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Account Security
              </h3>
              <p className="mb-5 text-gray-600">
                Manage your account settings and preferences here.
              </p>
              <Button title="Change Password" />
            </div>
          </div>
        )}
      <button
        className="bg-red-700 text-white px-6 w-full h-12 mt-10 rounded-full hover:bg-red-800 transition-colors"
        onClick={() => {
          authService.logout();
          route.push("/");
        }}
      >
        LogOut
      </button>
      </div>
    </div>
  );
};

export default UserProfile;
