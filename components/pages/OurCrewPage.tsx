import React from 'react';

const crewMembers = [
  {
    name: 'Aditya Singh',
    role: 'Co-Founder',
    subtitle: 'Marketing & Front End',
  image: '/aditya.jpg',
  },
  {
    name: 'Om Dihvedi',
    role: 'Co-Founder',
    subtitle: 'Back End & Cyber Security',
  image: '/om.jpg',
  },
  {
    name: 'Jake Pham',
    role: 'CPO',
    subtitle: 'Front End & Graphic design',
  image: '/jake.png',
  },
];

const CrewMemberCard: React.FC<{ member: typeof crewMembers[0], delay: number }> = ({ member, delay }) => (
    <div className="scroll-animation h-full group" style={{transitionDelay: `${delay}ms`}}>
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center h-full transition-all duration-300 ease-in-out group-hover:transform group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)]">
        <div className="relative inline-block">
            <img 
                className="w-48 h-48 rounded-full object-cover mx-auto filter grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out" 
                src={member.image} 
                alt={member.name} 
            />
        </div>
        <h3 className="mt-6 text-2xl font-bold">{member.name}</h3>
        <p className="mt-1 text-lg text-gray-400">{member.role}</p>
        <p className="text-sm text-gray-500">{member.subtitle}</p>
      </div>
    </div>
);


const OurCrewPage: React.FC = () => {
  return (
    <section id="crew" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto scroll-animation">
          <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tighter">The minds behind the mission.</h2>
          <p className="mt-6 text-xl sm:text-2xl text-gray-400 leading-relaxed">Meet the ambitious and passionate leadership team driving Rex Labs forward.</p>
        </div>
        
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {crewMembers.map((member, index) => (
            <CrewMemberCard key={index} member={member} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCrewPage;