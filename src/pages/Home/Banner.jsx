import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { IoIosArrowRoundForward } from 'react-icons/io';

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Make a Difference Today",
      description: "Join our community of volunteers and create positive change in your community",
      buttonText: "Browse Opportunities",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      overlayColor: "bg-[#00000080]"
    },
    {
      id: 2,
      title: "Find Volunteers for Your Cause",
      description: "Post your volunteer needs and connect with passionate individuals",
      buttonText: "Post a Need",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      overlayColor: "bg-[#00000080]"
    },
    {
      id: 3,
      title: "Together We Can Do More",
      description: "Thousands of volunteers making impacts every day across various causes",
      buttonText: "Join Now",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      overlayColor: "bg-[#00000080]"
    }
  ];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
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
            return `<span class="${className} !w-3 !h-3 !bg-white !opacity-100 !mx-1"></span>`;
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
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={`absolute inset-0 ${slide.overlayColor} flex items-center justify-center transition-all duration-1000`}>
                <div className="px-4 max-w-4xl text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg uppercase tracking-wide animate-fadeIn">
                    {slide.title}
                  </h2>
                  <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 drop-shadow-md max-w-2xl mx-auto animate-fadeIn delay-100">
                    {slide.description}
                  </p>
                  <button className="relative px-10 py-4 font-medium text-white overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#024870] to-[#024870] opacity-100 group-hover:opacity-0 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6bd3f3] to-[#024870] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#6bd3f3] group-hover:w-full transition-all duration-500"></div>
                    <span className="relative flex items-center justify-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                      {slide.buttonText}
                      <IoIosArrowRoundForward className='text-2xl' />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-next !text-white bg-[#024870] !w-12 !h-12 !right-4 after:!text-2xl after:!font-bold"></div>
        <div className="swiper-button-prev !text-white bg-[#024870] !w-12 !h-12 !left-4 after:!text-2xl after:!font-bold"></div>
      </Swiper>
      
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Banner;