import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { User, ThumbsUp, Heart, Zap } from 'lucide-react';

const InteractiveNetworkDemo = () => {
  const canvasRef = useRef(null);

  const reactions = [
    { text: "Wow!", x: 20, y: 15, emoji: "😍" },
    { text: "This is amazing", x: 70, y: 20, icon: "linkedin" },
    { text: "Perfect!", x: 25, y: 65, emoji: "🔥" },
    { text: "Well done!", x: 75, y: 70, icon: "x" },
    { text: "Love it!", x: 50, y: 40, emoji: "👏" },
    { text: "Incredible", x: 15, y: 40, icon: "linkedin" },
    { text: "Amazing work", x: 85, y: 45, icon: "x" },
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

    // Create nodes with avatars
    const nodes = [];
    const numNodes = 12;
    const radius = Math.min(canvas.width, canvas.height) * 0.35;

    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      nodes.push({
        x,
        y,
        targetX: x,
        targetY: y,
        radius: 20,
        glow: Math.random() > 0.7,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let time = 0;

    const animate = () => {
      time += 0.02;
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;

      nodes.forEach((node, i) => {
        nodes.forEach((otherNode, j) => {
          if (i < j && Math.random() > 0.5) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        // Subtle movement
        node.x = node.targetX + Math.sin(time + i) * 3;
        node.y = node.targetY + Math.cos(time + i) * 3;

        // Draw glow for highlighted nodes
        if (node.glow) {
          const glowSize = node.radius * 2 + Math.sin(time * 2 + node.pulsePhase) * 5;
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
          gradient.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
          gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw node circle (avatar placeholder)
        ctx.fillStyle = '#2a2a2a';
        ctx.strokeStyle = node.glow ? '#FFD700' : '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw user icon
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👤', node.x, node.y);
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
      <div className="max-w-[1600px] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg">
            <span className="text-white">See Your Market</span>{' '}
            <span className="block md:inline text-white">Before</span>{' '}
            <span className="text-clue-gray-500">Launch.</span>
          </h2>
          <p className="text-lg md:text-2xl text-clue-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Imagine your audience reacting to your campaign, before it ever goes live.
          </p>
        </motion.div>

        {/* Interactive Network Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full h-[400px] md:h-[600px] mb-12"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Reaction Bubbles */}
          {reactions.map((reaction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              className="absolute"
              style={{
                left: `${reaction.x}%`,
                top: `${reaction.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="glass-card rounded-2xl px-4 py-2 flex items-center gap-2 whitespace-nowrap hover:scale-110 transition-transform duration-300">
                {reaction.emoji && <span className="text-xl animate-pulse-slow">{reaction.emoji}</span>}
                {reaction.icon === 'linkedin' && (
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    in
                  </div>
                )}
                {reaction.icon === 'x' && (
                  <div className="w-5 h-5 bg-black rounded flex items-center justify-center text-white text-xs font-bold">
                    𝕏
                  </div>
                )}
                <span className="text-white font-semibold text-sm">{reaction.text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <button className="btn-outline text-lg shadow-glow hover:shadow-glow-lg">
            Product Overview
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveNetworkDemo;
