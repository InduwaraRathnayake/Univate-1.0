import React from "react";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
const teamMembers = [
  {
    id: 1,
    name: "Induwara Rathnayake",
    role: "CSE Undergraduate",
    university: "University of Moratuwa",
    image: "/member1.png",
    description: "Creative mind behind our stunning visual experiences.",
    linkedin: "https://www.linkedin.com/in/induwara-rathnayake/",
    github: "https://github.com/InduwaraRathnayake",
    email: "induwarar.22@cse.mrt.ac.lk",
  },
  {
    id: 2,
    name: "Pasindu Ravishan",
    role: "CSE Undergraduate",
    university: "University of Moratuwa",
    image: "/member2.png",
    description: "Strategic thinker driving our brand to new heights.",
    linkedin: "https://www.linkedin.com/in/pasindu-ravishan-74281629b/",
    github: "https://github.com/PasinduRavishan",
    email: "pasinduravishan.22@cse.mrt.ac.lk",
  },
  {
    id: 3,
    name: "Pathumi Ranasinghe",
    role: "CSE Undergraduate",
    university: "University of Moratuwa",
    image: "/member3.png",
    description: "Empathetic researcher uncovering deep user insights.",
    linkedin: "https://www.linkedin.com/in/pathumi-ranasinghe",
    github: "https://github.com/PathumiRanasinghe",
    email: "pathumi.22@cse.mrt.ac.lk",
  },
  {
    id: 4,
    name: "Chehan Dissanayake",
    role: "CSE Undergraduate",
    university: "University of Moratuwa",
    image: "/member4.png",
    description: "Intuitive stylist crafting impactful designs.",
    linkedin: "www.linkedin.com/in/chehan-dissanayake",
    github: "https://github.com/nchehan",
    email: "chehand.22@cse.mrt.ac.lk",
  },
];

interface TeamMemberProps {
  member: {
    id: number;
    name: string;
    role: string;
    university: string;
    image: string;
    description: string;
    linkedin: string;
    github: string;
    email: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500">
      <Image
        src={member.image}
        alt={`${member.name} - ${member.role}`}
        width={870}
        height={500}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-700">{member.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{member.role}</p>
        <p className="text-md text-gray-800 mb-3">{member.university}</p>
        <p className="text-gray-500 mb-4">{member.description}</p>
        <div className="flex justify-center space-x-4">
          <a
            href={member.linkedin}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            aria-label={`${member.name}'s LinkedIn profile`}
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href={member.github}
            className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
            aria-label={`${member.name}'s Github profile`}
          >
            <FaGithub size={24} />
          </a>
          <a
            href={`mailto:${member.email}`}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
            aria-label={`Email ${member.name}`}
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section className="bg-black min-h-screen py-28 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-7xl font-bold mb-12">About Us</h1>

        {/* Vision & Mission Section */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 mb-20 px-4">
          {/* Vision Block */}
          <div className="lg:w-1/2 bg-white p-8 rounded-xl border-2 border-black shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col h-full">
              <h3 className="text-3xl font-bold mb-4 text-center text-gray-900">
                Our Vision
              </h3>
              <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 text-center flex-grow">
                Our vision is to create a smarter, more connected world where
                technology seamlessly integrates with human needs, fostering
                growth, collaboration, and positive societal impact.
              </p>
            </div>
          </div>

          {/* Mission Block */}
          <div className="lg:w-1/2 bg-white p-8 rounded-xl border-2 border-black shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col h-full">
              <h3 className="text-3xl font-bold mb-4 text-center text-gray-900">
                Our Mission
              </h3>
              <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 text-center flex-grow">
                Our mission is to drive technological innovation and empower
                individuals by developing cutting-edge solutions that enhance
                efficiency, sustainability, and accessibility in various
                domains.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20 px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-black p-12 shadow-2xl mb-16 border border-gray-500">
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-6 text-white">
                Join Us on Our Journey
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
                We&apos;re on an exciting mission to redefine technology&apos;s
                role in society. Every line of code we write, every design we
                craft, and every solution we build is a step toward a better
                future. Want to be part of this adventure?
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {/* Primary button (white) */}
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400">
                  Collaborate With Us
                </button>

                {/* Secondary button (outline) */}
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-300 font-bold rounded-full hover:bg-gray-800 hover:border-white hover:text-white transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400">
                  Learn More
                </button>
              </div>
            </div>

            {/* Decorative elements (subtle circles) */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gray-700 rounded-full opacity-10"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-gray-600 rounded-full opacity-10"></div>
          </div>
        </div>

        {/* Team Section */}
        <h2 id="team-heading" className="text-5xl font-bold mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
