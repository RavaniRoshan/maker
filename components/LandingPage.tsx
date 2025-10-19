
import React from 'react';
import { motion } from 'framer-motion';
// FIX: Import missing icons
import { DumbbellIcon, TargetIcon, LeafIcon, ChefHatIcon } from './icons';

interface LandingPageProps {
  onGetStarted: () => void;
}

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    return (
        <main>
            {/* Hero Section */}
            <section className="text-center container mx-auto max-w-4xl px-4 pt-20 pb-16 md:pt-32 md:pb-24">
                 <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center items-center mb-6"
                >
                    <DumbbellIcon className="h-12 w-12 text-primary" />
                </motion.div>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-6 font-serif"
                >
                    Craft Your Perfect Meal Plan with AI
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
                >
                    Stop guessing. Start achieving. Tell us your goals, and let our AI craft a delicious, personalized meal plan to help you succeed.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <button
                        onClick={onGetStarted}
                        className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-lg text-lg"
                    >
                        Create My Plan Now
                    </button>
                </motion.div>
            </section>
            
            <div className="container mx-auto max-w-5xl px-4 space-y-24 py-16">
                 {/* Features Section */}
                <motion.section 
                    id="features" 
                    className="text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    <motion.h2 variants={featureVariants} custom={0} className="text-3xl font-bold mb-4">A Smarter Way to Eat</motion.h2>
                    <motion.p variants={featureVariants} custom={1} className="text-muted-foreground max-w-2xl mx-auto mb-12">
                        Everything you need to reach your fitness goals, powered by Google Gemini.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div variants={featureVariants} custom={2} className="p-6 bg-card rounded-xl border border-border shadow-md text-center flex flex-col items-center">
                            <TargetIcon className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-bold text-lg mb-2">Personalized Plans</h3>
                            <p className="text-sm text-muted-foreground">
                                Get meal plans tailored to your specific calorie needs, dietary restrictions, and fitness goals.
                            </p>
                        </motion.div>
                        <motion.div variants={featureVariants} custom={3} className="p-6 bg-card rounded-xl border border-border shadow-md text-center flex flex-col items-center">
                            <LeafIcon className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-bold text-lg mb-2">Detailed Nutrition</h3>
                            <p className="text-sm text-muted-foreground">
                                Each meal comes with a full breakdown of calories, protein, carbs, and fat.
                            </p>
                        </motion.div>
                        <motion.div variants={featureVariants} custom={4} className="p-6 bg-card rounded-xl border border-border shadow-md text-center flex flex-col items-center">
                            <ChefHatIcon className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-bold text-lg mb-2">Multi-Day Planning</h3>
                            <p className="text-sm text-muted-foreground">
                                Upgrade to premium to generate plans for up to a full week, saving you time and effort.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>

                {/* How It Works Section */}
                <motion.section 
                    id="how-it-works" 
                    className="text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    <motion.h2 variants={featureVariants} custom={0} className="text-3xl font-bold mb-12">Three Simple Steps</motion.h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left relative">
                        {/* Dashed line for desktop */}
                        <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-transparent">
                          <svg width="100%" height="100%"><line x1="0" y1="0" x2="100%" y2="0" strokeWidth="2" stroke="var(--border)" strokeDasharray="8, 8"></line></svg>
                        </div>
                        <motion.div variants={featureVariants} custom={1} className="flex flex-col items-center text-center z-10">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4 border-4 border-background">1</div>
                            <h3 className="font-bold mb-2">Set Preferences</h3>
                            <p className="text-sm text-muted-foreground">
                                Fill out the simple form with your goals, calorie targets, and dietary needs.
                            </p>
                        </motion.div>
                        <motion.div variants={featureVariants} custom={2} className="flex flex-col items-center text-center z-10">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4 border-4 border-background">2</div>
                            <h3 className="font-bold mb-2">Generate Plan</h3>
                            <p className="text-sm text-muted-foreground">
                                Our AI, powered by Gemini, will instantly create a custom meal plan for you.
                            </p>
                        </motion.div>
                        <motion.div variants={featureVariants} custom={3} className="flex flex-col items-center text-center z-10">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4 border-4 border-background">3</div>
                            <h3 className="font-bold mb-2">Reach Goals</h3>
                            <p className="text-sm text-muted-foreground">
                                Follow your delicious and easy-to-make plan to achieve your fitness dreams.
                            </p>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
};
