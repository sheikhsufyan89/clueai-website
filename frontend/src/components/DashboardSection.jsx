import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, BookOpen, Settings, LogOut, Plus } from 'lucide-react';

const DashboardSection = () => {
  const canvasRef = useRef(null);

  const impactScores = [
    { label: 'Positive', value: 87, color: '#10b981' },
    { label: 'Negative', value: 87, color: '#ef4444' },
    { label: 'Ignored', value: 87, color: '#6b7280' }
  ];

  const summaryPoints = [
    'Highly resonant with commuters in urban areas',
    'Positive sentiment around reliability messaging',
    'Minor concerns about pricing mentioned',
    'Strong brand recall in key demographics',
    'Recommendation: Emphasize convenience in final cut'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Create network nodes
    const nodes = [];
    const numNodes = 20;
    const radius = Math.min(canvas.width, canvas.height) * 0.3;

    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * Math.PI * 2;
      const r = radius * (0.3 + Math.random() * 0.7);
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;

      nodes.push({
        x,
        y,
        targetX: x,
        targetY: y,
        radius: 4 + Math.random() * 3
      });
    }

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = 'rgba(26, 26, 26, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i < j) {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) +
              Math.pow(node.y - otherNode.y, 2)
            );
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.globalAlpha = 0.1 * (1 - distance / 150);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        });
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        node.x = node.targetX + Math.sin(time + i) * 2;
        node.y = node.targetY + Math.cos(time + i) * 2;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen bg-clue-black py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 md:gap-0"
        >
          {/* Logo */}
          <h1 className="text-2xl font-bold text-white tracking-wider">CLUE AI</h1>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {['All Campaigns', 'Data Range', 'Sentiment'].map((filter, index) => (
              <button
                key={index}
                className="px-4 md:px-6 py-2 bg-clue-gray-900 border border-white/10 rounded-lg text-white flex items-center gap-2 hover:bg-clue-gray-800 transition-all text-sm md:text-base"
              >
                {filter}
                <ChevronDown className="w-4 h-4" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-12 lg:col-span-2 card-dark shadow-glow"
          >
            <div className="space-y-6">
              {/* Current Campaign */}
              <div>
                <p className="text-gray-400 text-sm mb-3">Current Campaign</p>
                <div className="bg-white rounded-full px-4 py-2 text-black font-medium text-center">
                  Uber Ride
                </div>
              </div>

              {/* New Campaign Button */}
              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95">
                <Plus className="w-4 h-4" />
                New Campaign
              </button>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom Menu */}
              <div className="space-y-2 pt-32">
                <button className="w-full text-left px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Product Guide</span>
                </button>
                <button className="w-full text-left px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </button>
                <button className="w-full text-left px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all flex items-center gap-3">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Log Out</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Center Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-12 lg:col-span-7 space-y-6 lg:space-y-8"
          >
            {/* Network Graph */}
            <div className="card-dark h-96 relative overflow-hidden shadow-glow">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            {/* Campaign Description */}
            <div className="card-dark shadow-glow hover:border-white/30 transition-all">
              <h3 className="text-2xl font-bold text-white mb-4">
                Uber - "You're Almost There" Campaign
              </h3>
              <p className="text-gray-300 leading-relaxed">
                This campaign focuses on the final moments of a rider's journey, when anticipation peaks.
                The message highlights Uber's reliability during those crucial last few minutes,
                emphasizing punctuality and trust. The creative showcases diverse urban settings with
                riders checking their phones, seeing "You're Almost There" notifications. The tone is
                reassuring yet exciting, targeting commuters who value time efficiency. Initial testing
                shows strong resonance with professional demographics aged 25-45 in metropolitan areas.
                The campaign leverages real-time tracking as a key differentiator, positioning Uber as
                the dependable choice for time-conscious users.
              </p>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-12 lg:col-span-3 space-y-6 lg:space-y-8"
          >
            {/* Impact Score Panel */}
            <div className="card-dark shadow-glow">
              <h4 className="text-white font-semibold text-lg mb-6">Impact Score</h4>

              {/* Small Circles */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {impactScores.map((score, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative w-16 h-16 mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#2a2a2a"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke={score.color}
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - score.value / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{score.value}%</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs">{score.label}</span>
                  </div>
                ))}
              </div>

              {/* Large Donut Chart */}
              <div className="flex justify-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#2a2a2a"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#10b981"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70 * 0.6} ${2 * Math.PI * 70}`}
                      strokeLinecap="round"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#ef4444"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70 * 0.2} ${2 * Math.PI * 70}`}
                      strokeDashoffset={`${-2 * Math.PI * 70 * 0.6}`}
                      strokeLinecap="round"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#6b7280"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70 * 0.2} ${2 * Math.PI * 70}`}
                      strokeDashoffset={`${-2 * Math.PI * 70 * 0.8}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">87%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Panel */}
            <div className="card-dark shadow-glow">
              <h4 className="text-white font-semibold text-lg mb-4">Summary</h4>
              <ul className="space-y-3">
                {summaryPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-white mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
