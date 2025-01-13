import React from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white/10 text-white  w-full ">
      <div className="max-w-6xl mx-auto text-center py-8">
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={180}
          height={180}
          className="mx-auto"
        />
        <p className="text-xl mt-4">
          Empowering future innovators with the guidance they need to succeed.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl mb-2">Subscribe to our newsletter</h2>
          <p className="mb-4">
            Stay up to date with the latest news and updates.
          </p>
          <form className="flex justify-center gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 pr-4 pl-4">
        <div>
          <h2 className="font-bold mb-4">Services</h2>
          <ul>
            <li>Career Guidance</li>
            <li>Progress Tracking</li>
            <li>Stream Consultation</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold mb-4">Company</h2>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Testimonials</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold mb-4">Support</h2>
          <ul>
            <li>GPA calculation</li>
            <li>Quizes</li>
            <li>Modules</li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold mb-4">Careers & Opportunities</h2>
          <ul>
            <li>Internship Programs</li>
            <li>Job Opportunities</li>
            <li>Industry Collaborations</li>
          </ul>
        </div>
      </div>

      <div className=" text-center mt-8 pb-8">
        <div className="mb-4">
          <FaFacebookF className="inline mx-2" />
          <FaLinkedinIn className="inline mx-2" />
          <FaInstagram className="inline mx-2" />
        </div>
        <p>&copy; {year} Univate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
