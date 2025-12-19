import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CasesCarousel = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cases = [
    {
      title: 'Branding',
      description: 'Test if your brand story truly connects with your audience.'
    },
    {
      title: 'Advertising',
      description: 'Run A/B simulations on ad creatives, copy, and visuals.'
    },
    {
      title: 'Public Relations',
      description: 'Forecast reactions to press releases or sensitive announcements.'
    },
    {
      title: 'Product Launches',
      description: 'See how your market will respond before you go live.'
    },
    {
      title: 'Social Media Campaigns',
      description: 'Test memes, taglines, and engagement strategies with real persona reactions.'
    }
  ];

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      const newScrollLeft = direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <section className="relative min-h-screen bg-clue-black py-12 md:py-20 px-4 md:px-8 flex flex-col justify-center">
      <div className="max-w-[1800px] mx-auto w-full">
        {/* Cases Button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <button className="btn-outline text-lg shadow-glow">
            Cases
          </button>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-glow-lg hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-glow-lg hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cases.map((caseItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-none w-[280px] md:w-[400px] lg:w-[450px]"
              >
                <div className="h-[400px] card-dark overflow-hidden hover:shadow-glow transition-all duration-300 group hover-lift p-0 border-2">
                  {/* Top section with title */}
                  <div className="h-2/5 p-8 flex items-center justify-center bg-clue-black border-b border-white/10 group-hover:border-white/20 transition-colors">
                    <h3 className="text-3xl font-bold text-white text-center">
                      {caseItem.title}
                    </h3>
                  </div>

                  {/* Bottom section with description */}
                  <div className="h-3/5 p-8 flex items-center justify-center bg-gradient-to-b from-clue-gray-900 to-clue-black">
                    <p className="text-gray-300 text-lg leading-relaxed text-center group-hover:text-white transition-colors duration-300">
                      {caseItem.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {cases.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-700 hover:bg-white transition-colors cursor-pointer"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CasesCarousel;
