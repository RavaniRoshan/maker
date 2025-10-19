import React from 'react';
import { motion } from 'framer-motion';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { TargetIcon, LeafIcon, ChefHatIcon } from './icons';

interface LandingPageProps {
  onStart: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <NavBar onStart={onStart} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-center py-20 md:py-32">
          <motion.div
            className="container mx-auto max-w-4xl px-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold font-serif text-foreground"
              variants={itemVariants}
            >
              Fuel Your Ambition.
            </motion.h1>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold font-serif text-primary mt-2"
              variants={itemVariants}
            >
              Perfectly Planned.
            </motion.h2>
            <motion.p 
              className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
              variants={itemVariants}
            >
              AI-powered meal plans designed for your unique fitness goals. Stop guessing, start achieving.
            </motion.p>
            <motion.div className="mt-10" variants={itemVariants}>
              <button
                onClick={onStart}
                className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-md text-lg"
              >
                Create Your Free Plan Now
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <motion.section 
          id="features" 
          className="py-20 bg-muted border-y border-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tailored Nutrition at Your Fingertips</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                  <TargetIcon />
                </div>
                <h3 className="font-semibold text-lg mb-2">Personalized Goals</h3>
                <p className="text-muted-foreground text-sm">Whether you want to lose weight, gain muscle, or maintain, our AI crafts the perfect plan for you.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                  <LeafIcon />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dietary Freedom</h3>
                <p className="text-muted-foreground text-sm">Vegetarian, vegan, gluten-free, and more. Your dietary needs are always our priority.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                  <ChefHatIcon />
                </div>
                <h3 className="font-semibold text-lg mb-2">Delicious Variety</h3>
                <p className="text-muted-foreground text-sm">Say goodbye to boring meals. Discover new, easy-to-make recipes that you'll actually enjoy.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section 
          id="how-it-works" 
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Get Your Plan in 3 Simple Steps</h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
              <div className="text-center md:text-left flex-1">
                <p className="text-6xl font-serif font-bold text-primary/20 mb-2">1</p>
                <h3 className="font-semibold text-lg mb-2">Tell Us About You</h3>
                <p className="text-muted-foreground text-sm">Quickly input your goals, calorie targets, and dietary restrictions in our simple form.</p>
              </div>
               <div className="text-center md:text-left flex-1">
                <p className="text-6xl font-serif font-bold text-primary/20 mb-2">2</p>
                <h3 className="font-semibold text-lg mb-2">AI Generates Your Plan</h3>
                <p className="text-muted-foreground text-sm">Our powerful Gemini-powered AI analyzes your data to create a balanced and effective meal plan.</p>
              </div>
               <div className="text-center md:text-left flex-1">
                <p className="text-6xl font-serif font-bold text-primary/20 mb-2">3</p>
                <h3 className="font-semibold text-lg mb-2">Start Your Journey</h3>
                <p className="text-muted-foreground text-sm">Receive your detailed plan instantly and start working towards a healthier you.</p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};