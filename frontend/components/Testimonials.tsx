import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Univate 1.0 made stream selection stress-free and helped me excel academically with its GPA tracker and career insights.",
      name: "Ayesha Perera",
      designation: "Final Year Student",
      src: "/person1.jpg",
    },
    {
      quote:
        "This platform is a game-changer! The stream recommendations and digital CSE handbook saved me so much time.",
      name: "Chandima Fernando",
      designation: "Data Scientist at TechSol",
      src: "/person2.jpg",
    },
    {
      quote:
        "Univate 1.0 provided invaluable guidance for my child, making their academic decisions easier and well-informed.",
      name: "Ravindu Silva",
      designation: " CSE Graduate",
      src: "/person3.jpg",
    },
    {
      quote:
        "The career insights and academic tools on this platform are unmatched. It's like having a personal mentor!",
      name: "Nimali Gunawardana",
      designation: "3rd Year Undergraduate",
      src: "/person4.jpg",
    },
    {
      quote:
        "This platform is a must-have for CSE students. It simplified my journey and opened doors to exciting opportunities.",
      name: " Dineth Samarasinghe",
      designation: "Software Engineer",
      src: "/person5.jpg",
    },
  ];
  return (
  
       
    <div className="min-h-screen w-full ">
     
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
 
  );
}
