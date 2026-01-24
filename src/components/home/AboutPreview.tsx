import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import WaveDivider from "@/components/WaveDivider"; // Keeping your wave divider

// 1. DATA DEFINITIONS
const leadershipData = [
  {
    name: "Dr. Sarah Johnson",
    role: "Founder & Chairperson",
    qualification: "Ph.D. in Educational Psychology",
    image: "" 
  },
  {
    name: "Mr. David Chen",
    role: "Director of Academics",
    qualification: "M.Ed., Harvard University",
    image: ""
  },
  {
    name: "Mrs. Priya Patel",
    role: "Head of Administration",
    qualification: "MBA, IIM Bangalore",
    image: ""
  },
  {
    name: "Dr. James Wilson",
    role: "Dean of Student Affairs",
    qualification: "Ed.D. in Leadership",
    image: ""
  }
];

const aboutData = {
  title: "Who We Are",
  description: "At EduPrime Academy, we believe in creating a nurturing environment where every child can thrive. Our holistic approach combines academic excellence with character development, ensuring students grow into confident, compassionate leaders.",
  highlights: [
    "Child-centered learning approach",
    "Experienced and caring educators",
    "Safe and inclusive environment",
    "Focus on holistic development"
  ],
};

const collageImages = [
  { id: 1, alt: "Students learning", emoji: "📚" },
  { id: 2, alt: "Classroom activity", emoji: "🎨" },
  { id: 3, alt: "Outdoor activities", emoji: "⚽" },
  { id: 4, alt: "Group project", emoji: "🤝" },
];

// 2. MAIN COMPONENT
const AboutPreview = () => {
  return (
    <section className="bg-beige py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">

        {/* TOP SECTION: Visionary Leaders (Moved Here) */}
        <div className="relative mb-24">
            {/* Decorative Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-olive/5 via-mustard/5 to-olive/5 blur-3xl rounded-full -z-10" />

            <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-olive mb-4">
                Our Visionary Leaders
            </h2>
            <div className="h-1 w-24 bg-mustard mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Steering our institution with wisdom, compassion, and a steadfast commitment to educational excellence.
            </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipData.map((leader, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative bg-white rounded-[2rem] p-2 shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                {/* Inner Card Content */}
                <div className="bg-cream/50 rounded-[1.5rem] p-6 h-full flex flex-col items-center text-center relative overflow-hidden transition-colors group-hover:bg-cream">
                    
                    {/* Top Gradient Decoration */}
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-olive/10 to-transparent opacity-50" />

                    {/* Avatar Circle */}
                    <div className="relative mb-6 z-10">
                    <div className="w-28 h-28 rounded-full border-[4px] border-white shadow-md flex items-center justify-center bg-gradient-to-br from-olive to-olive-dark overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        {/* Fallback Initials */}
                        <span className="text-3xl font-serif text-mustard font-bold select-none">
                        {leader.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                    </div>
                    
                    {/* Decorative Badge Icon */}
                    <div className="absolute bottom-1 right-1 bg-mustard w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-20">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                    </div>

                    {/* Text Details */}
                    <div className="relative z-10 w-full">
                    <h4 className="font-serif text-xl font-bold text-olive mb-1 group-hover:text-mustard transition-colors">
                        {leader.name}
                    </h4>
                    <p className="text-mustard text-xs font-bold uppercase tracking-widest mb-3">
                        {leader.role}
                    </p>
                    
                    {/* Separator Line */}
                    <div className="w-12 h-[2px] bg-olive/10 mx-auto mb-4 group-hover:w-full group-hover:bg-mustard/20 transition-all duration-500" />
                    
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                        {leader.qualification}
                    </p>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        </div>
        
        {/* BOTTOM SECTION: Who We Are (Moved Here) */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Photo Collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 order-2 lg:order-1"
          >
            {collageImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-cream rounded-xl sm:rounded-2xl shadow-card overflow-hidden flex items-center justify-center ${
                  index === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <div className="text-center p-4 sm:p-6">
                  <span className="text-3xl sm:text-4xl lg:text-5xl">{image.emoji}</span>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1 sm:mt-2">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-olive mb-4 sm:mb-6 brush-underline inline-block">
              {aboutData.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 mt-6 sm:mt-8">
              {aboutData.description}
            </p>
            
            <ul className="space-y-3 sm:space-y-4">
              {aboutData.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-mustard/20 flex items-center justify-center shrink-0">
                    <span className="text-mustard text-sm sm:text-base">✓</span>
                  </span>
                  <span className="text-olive font-medium text-sm sm:text-base">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>

      <WaveDivider fillColor="hsl(var(--cream))" className="mt-12 sm:mt-16" />
    </section>
  );
};

export default AboutPreview;