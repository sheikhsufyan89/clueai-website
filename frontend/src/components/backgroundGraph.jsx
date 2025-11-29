import { useRef, useEffect, useMemo, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

const BackgroundGraph = () => {
  const fgRef = useRef();
  const animationRef = useRef();
  const [dimensions, setDimensions] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });

  // Generate stable graph data that doesn't change on re-renders
  const graphData = useMemo(() => {
    const N = 50; // Number of nodes
    const nodes = Array.from({ length: N }, (_, i) => ({ 
      id: i,
      // Add some initial position for smoother start
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 100,
      z: (Math.random() - 0.5) * 100
    }));
    
    const links = Array.from({ length: Math.floor(N * 1.2) }, () => {
      const source = Math.floor(Math.random() * N);
      let target = Math.floor(Math.random() * N);
      // Avoid self-links
      while (target === source) {
        target = Math.floor(Math.random() * N);
      }
      return { source, target };
    });

    return { nodes, links };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!fgRef.current) return;

    const fg = fgRef.current;
    
    // Configure physics for smoother movement
    fg.d3Force('charge').strength(-50);
    fg.d3Force('link').distance(50);
    
    // Set initial camera position
    fg.cameraPosition({ 
      x: 0, 
      y: 0, 
      z: 150 
    });

    // Smooth rotation animation
    let angle = 0;
    const rotationSpeed = 0.002; // Slower for smoother rotation
    
    const animate = () => {
      angle += rotationSpeed;
      
      // Smooth circular camera movement
      const radius = 200;
      fg.cameraPosition({
        x: radius * Math.sin(angle),
        z: radius * Math.cos(angle)
      });

      // Optional: Add some subtle vertical movement
      fg.cameraPosition({
        y: Math.sin(angle * 0.5) * 30
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay for initial stabilization
    const startTimeout = setTimeout(() => {
      animate();
    }, 500);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Add some post-processing for smoother visuals
  useEffect(() => {
    if (fgRef.current) {
      // Enable anti-aliasing if available
      const renderer = fgRef.current.renderer();
      if (renderer) {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    }
  }, []);

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={graphData}
      nodeColor={() => '#00ff88'}
      nodeOpacity={0.8}
      nodeRelSize={6}
      linkColor={() => '#ffffff'}
      linkOpacity={0.2}
      linkWidth={1}
      linkDirectionalParticles={2}
      linkDirectionalParticleSpeed={0.005}
      linkDirectionalParticleWidth={2}
      backgroundColor="#00000000"
      enableNodeDrag={false}
      showNavInfo={false}
      nodeResolution={32} // Higher resolution for smoother nodes
      width={dimensions.width}
      height={dimensions.height}
      d3AlphaDecay={0.01} // Slower decay for smoother transitions
      d3VelocityDecay={0.3}
      warmupTicks={100} // Pre-calculate physics before showing
      cooldownTicks={0} // Never stop physics
      onEngineStop={() => {
        // Keep physics running
        if (fgRef.current) {
          fgRef.current.d3ReheatSimulation();
        }
      }}
    />
  );
};

export default BackgroundGraph;