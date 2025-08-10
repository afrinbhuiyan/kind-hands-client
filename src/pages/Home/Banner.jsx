import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { motion } from 'framer-motion';

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Make a Difference Today",
      description: "Join our community of volunteers and create positive change in your community",
      buttonText: "Browse Opportunities",
      image: {
        desktop: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        mobile: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      overlayColor: "bg-[#00000080]"
    },
    {
      id: 2,
      title: "Find Volunteers for Your Cause",
      description: "Post your volunteer needs and connect with passionate individuals",
      buttonText: "Post a Need",
      image: {
        desktop: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        mobile: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      overlayColor: "bg-[#00000080]"
    },
    {
      id: 3,
      title: "Together We Can Do More",
      description: "Thousands of volunteers making impacts every day across various causes",
      buttonText: "Join Now",
      image: {
        desktop: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        mobile: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
      },
      overlayColor: "bg-[#00000080]"
    }
  ];

  // Animation variants for title words
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const wordItem = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotate: 5
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !w-2 !h-2 sm:!w-3 sm:!h-3 !bg-white !opacity-100 !mx-1"></span>`;
          }
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-full relative">
              {/* Responsive image loading */}
              <picture>
                <source media="(min-width: 768px)" srcSet={slide.image.desktop} />
                <source srcSet={slide.image.mobile} />
                <img 
                  src={slide.image.desktop} 
                  alt="" 
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </picture>
              
              <div className={`absolute inset-0 ${slide.overlayColor} flex items-center justify-center transition-all duration-1000`}>
                <div className="px-4 sm:px-6 max-w-4xl mx-auto text-center">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="mb-3 sm:mb-4 md:mb-6"
                  >
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg uppercase tracking-wide">
                      {slide.title.split(' ').map((word, i) => (
                        <motion.span 
                          key={i} 
                          variants={wordItem}
                          className="inline-block"
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                    </h2>
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 drop-shadow-md max-w-2xl mx-auto"
                  >
                    {slide.description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <button 
                      className="relative px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 font-medium text-white overflow-hidden group"
                      aria-label={slide.buttonText}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#024870] to-[#024870] opacity-100 group-hover:opacity-0 transition-all duration-300"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#6bd3f3] to-[#024870] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#6bd3f3] group-hover:w-full transition-all duration-500"></div>
                      <span className="relative flex items-center justify-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                        {slide.buttonText}
                        <IoIosArrowRoundForward className='text-xl sm:text-2xl' />
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div 
          className="swiper-button-next !text-white bg-[#024870] !w-8 !h-8 sm:!w-10 sm:!h-10 md:!w-12 md:!h-12 !right-2 sm:!right-4 after:!text-xl sm:after:!text-2xl after:!font-bold"
          aria-label="Next slide"
        ></div>
        <div 
          className="swiper-button-prev !text-white bg-[#024870] !w-8 !h-8 sm:!w-10 sm:!h-10 md:!w-12 md:!h-12 !left-2 sm:!left-4 after:!text-xl sm:after:!text-2xl after:!font-bold"
          aria-label="Previous slide"
        ></div>
      </Swiper>
    </div>
  );
};

export default Banner;