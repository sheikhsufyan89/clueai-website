import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.85;
    canvas.height = window.innerHeight;

    const userImage = new Image();
    userImage.src = '/user.png';

    // Create network nodes
    const nodes = [];
    const numNodes = 15;

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 5 + 4,
        connections: []
      });
    }

    // Create connections
    nodes.forEach((node, i) => {
      const numConnections = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * numNodes);
        if (targetIndex !== i) {
          node.connections.push(targetIndex);
        }
      }
    });

    // Create particles
    const particlesArray = [];
    for (let i = 0; i < 50; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex];
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });
      });

      // Draw and update nodes
      nodes.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        const visualRadius = node.radius * 6;

        // Bounce off edges with visual radius
        if (node.x - visualRadius < 0 || node.x + visualRadius > canvas.width) {
          node.vx *= -1;
          // Clamp position to prevent sticking
          if (node.x - visualRadius < 0) node.x = visualRadius;
          if (node.x + visualRadius > canvas.width) node.x = canvas.width - visualRadius;
        }

        if (node.y - visualRadius < 0 || node.y + visualRadius > canvas.height) {
          node.vy *= -1;
          // Clamp position to prevent sticking
          if (node.y - visualRadius < 0) node.y = visualRadius;
          if (node.y + visualRadius > canvas.height) node.y = canvas.height - visualRadius;
        }

        // Draw node glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 8);
        gradient.addColorStop(0, 'rgba(160, 160, 160, 0.3)');
        gradient.addColorStop(1, 'rgba(160, 160, 160, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw node
        if (userImage.complete) {
          const outerRadius = node.radius * 6;
          const imageRadius = outerRadius - 4; // Padding between ring and image

          // Draw outer ring
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, outerRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Draw image
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x, node.y, imageRadius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(userImage, node.x - imageRadius, node.y - imageRadius, imageRadius * 2, imageRadius * 2);
          ctx.restore();
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw and update particles
      particlesArray.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth * 0.85;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative h-screen bg-clue-black overflow-hidden font-inter">
      {/* Logo */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <div className="max-w-[1600px] mx-auto px-3 md:px-8 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-auto inline-block"
          >
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider text-shadow font-michroma">CLUE AI</h1>
          </motion.div>
        </div>
      </div>

      {/* Right side - Network Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-0 right-0 h-full w-[85vw] translate-x-[20%] hidden md:block z-0"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </motion.div>

      <div className="relative h-full flex flex-col md:flex-row items-center md:items-center justify-start px-3 md:px-8 max-w-[1600px] mx-auto pt-20 md:pt-0 pointer-events-none">
        {/* Left side - Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="z-10 max-w-2xl w-full md:w-auto pointer-events-auto"
        >
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold leading-tight text-shadow-lg text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block text-white"
            >
              Simulating
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block text-white"
            >
              Worlds For
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="block gradient-text-white-gray"
            >
              Better Marketing
            </motion.span>
          </h2>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-400 text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
