import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, TrendingUp, Loader } from 'lucide-react';

const FeatureCardsSection = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const features = [
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Realistic Personas',
      description: 'Built to think and feel like your customers'
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Instant Simulations',
      description: 'Test campaigns in minutes, not months'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Actionable Insights',
      description: 'Reactions, sentiment, and strategy in one place'
    }
  ];

  const handleSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  return (
    <section className="relative min-h-screen bg-clue-black py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="card-dark hover-lift"
            >
              <div className="text-clue-gray-400 mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-clue-gray-400 text-lg leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Large Centered Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-shadow-lg">
            <span className="text-white">FROM IDEA TO REACTION - IN </span>
            <span className="text-clue-gray-500">MINUTES</span>
          </h2>
        </motion.div>

        {/* Simulation Input Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-6 md:p-8 shadow-glow">
            {/* Search/Input Bar */}
            <div className="bg-clue-gray-900/50 rounded-full flex flex-col md:flex-row items-stretch md:items-center px-4 md:px-6 py-4 mb-6 border border-white/10 hover:border-white/30 transition-all gap-4 md:gap-0">
              <input
                type="text"
                placeholder="Enter brand and campaign details"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
              />
              <button
                onClick={handleSimulation}
                disabled={isSimulating || !inputValue}
                className="md:ml-4 btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Next
              </button>
            </div>

            {/* Run Simulation */}
            <div className="flex items-center justify-center gap-4">
              <span className="text-gray-400 text-lg">Run instant simulation</span>
              <div className="relative">
                {isSimulating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-600 border-t-white" />
                )}
              </div>
            </div>

            {/* Simulating indicator */}
            {isSimulating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white">Analyzing campaign...</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCardsSection;
