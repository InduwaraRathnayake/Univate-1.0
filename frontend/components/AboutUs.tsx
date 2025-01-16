import React from 'react';
import Image from 'next/image'; 
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const teamMembers = [
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'CSE Undergraduate' ,
    university:' University of Moratuwa',
    image: '/member.jpg',
    description: 'Creative mind behind our stunning visual experiences.',
    linkedin: 'https://www.linkedin.com/in/induwara-rathnayake/',
    github: 'https://github.com/InduwaraRathnayake',
    email: 'induwarar.22@cse.mrt.ac.lk '
  },
  {
    id: 4,
    name: 'Mike Johnson',
    role: 'CSE Undergraduate',
    university:' University of Moratuwa',
    image: '/member.jpg',
    description: 'Strategic thinker driving our brand to new heights.',
    linkedin: 'https://www.linkedin.com/in/pasindu-ravishan-74281629b/',
    github: 'https://github.com/PasinduRavishan',
    email: 'pasinduravishan.22@cse.mrt.ac.lk'
  },
  {
    id: 6,
    name: 'Mike Johnson',
    role: 'CSE Undergraduate',
    university:' University of Moratuwa',
    image: '/member.jpg',
    description: 'Empathetic researcher uncovering deep user insights.',
    linkedin: 'www.linkedin.com/in/pathumi-ranasinghe',
    github: 'https://github.com/PathumiRanasinghe',
    email: 'pathumi.22@cse.mrt.ac.lk'
  }
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
        width={870} // Set width and height for Next.js Image optimization
        height={580}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-700">{member.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{member.role}</p>
        <p className="text-md text-gray-800 mb-3">{member.university}</p>
        <p className="text-gray-500 mb-4">{member.description}</p>
        <div className="flex justify-center space-x-4">
          <a href={member.linkedin} className="text-blue-600 hover:text-blue-800 transition-colors duration-300" aria-label={`${member.name}'s LinkedIn profile`}>
            <FaLinkedin size={24} />
          </a>
          <a href={member.github} className="text-blue-400 hover:text-blue-600 transition-colors duration-300" aria-label={`${member.name}'s Twitter profile`}>
            <FaGithub size={24} />
          </a>
          <a href={`mailto:${member.email}`} className="text-gray-500 hover:text-gray-800 transition-colors duration-300" aria-label={`Email ${member.name}`}>
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <section className="bg-black min-h-screen py-28 px-4 sm:px-6 lg:px-8" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="team-heading" className="text-5xl font-bold dark:text-white text-white text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
