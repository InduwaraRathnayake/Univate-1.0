"use client";

import React from "react";
import { FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";
import Button from "@/components/ui/button";

const ContactUsPage = () => {
  const chatOptions = [
    {
      title: "Live Chat",
      description: "Connect instantly for quick, reliable support",
      icon: <FaCommentDots />,
      buttonText: "Start Chatting",
      actionLink: "https://wa.me/0774289821",
    },
    {
      title: "Email Us",
      description: "Submit your inquiry and receive our assistance",
      icon: <FaEnvelope />,
      buttonText: "Send an Email",
      actionLink:
        "https://mail.google.com/mail/?view=cm&fs=1&to=isptrio@gmail.com&su=Customer Inquiry&body=Hi, I have a question about...",
    },
    {
      title: "Call Us",
      description: "We're here for you anytime, always available",
      icon: <FaPhone />,
      buttonText: "Call Us Now",
      actionLink: "tel:0112640051",
    },
  ];

  return (
    <div
      className="flex flex-col min-h-screen"
      id="contact"
      style={{
        backgroundImage: 'url("/wallpaper4.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <main className="flex-grow p-4 bg-black/50">
        <h1 className="text-5xl mt-20 mb-10 font-bold text-center text-white flex flew flex-wrap justify-center gap-4">
          <span className="">We Are Here for You, Contact Us </span>
          <span className="text-black font-extrabold bg-white rounded-xl pb-3 px-2">
            Anytime
          </span>
        </h1>
        <p className="mb-20 text-center text-gray-100 text-2xl">
          Have any questions or need help? Feel free to reach out to us
          directly, and we will get back to you as soon as possible.
        </p>

        <div className="grid md:grid-cols-3 gap-20 mt-30">
          {chatOptions.map((option) => (
            <div
              key={option.title}
              className="bg-white text-black p-4 shadow-lg rounded-lg flex flex-col items-center justify-center "
            >
              <div className="flex justify-center text-3xl mb-4">
                {option.icon}
              </div>
              <h2 className="text-xl mb-2">{option.title}</h2>
              <p className="mb-4">{option.description}</p>
              <a
                href={option.actionLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button title={option.buttonText} otherClasses="mb-2" />
              </a>
            </div>
          ))}
        </div>
        <p className="mt-20 text-center text-white text-lg">
          Get in touch with us to explore partnership opportunities, resolve
          issues, or simply share your thoughts. We value your feedback and look
          forward to hearing from you.
        </p>
      </main>
    </div>
  );
};

export default ContactUsPage;
