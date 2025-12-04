// HeroSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CTAButton from './CTAButton';

const HeroSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    arrows: false,
    pauseOnHover: false,
    dotsClass: "slick-dots custom-dots"
  };

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Healthcare Made Simple",
      subtitle: "Connect with expert doctors and book appointments in minutes",
      gradient: "from-blue-600/80 to-indigo-700/80"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Your Health, Our Priority", 
      subtitle: "Comprehensive medical care from the comfort of your home",
      gradient: "from-emerald-600/80 to-teal-700/80"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "24/7 Medical Support",
      subtitle: "Instant access to healthcare professionals anytime, anywhere",
      gradient: "from-rose-600/80 to-pink-700/80"
    }
  ];

  return (
    <>
      <style jsx global>{`
        .custom-dots {
          bottom: 40px;
        }
        .custom-dots li button:before {
          color: white;
          font-size: 14px;
          opacity: 0.7;
        }
        .custom-dots li.slick-active button:before {
          color: white;
          opacity: 1;
        }
        .animate-zoom {
          animation: zoom 25s infinite alternate ease-in-out;
        }
        @keyframes zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="relative h-[85vh] min-h-[600px] overflow-x-hidden m-auto w-screen p-0">
        <Slider {...sliderSettings} className="h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="relative h-[85vh] min-h-[600px]">
              <div className="absolute inset-0">
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat animate-zoom"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              <div className="relative z-10 flex items-center h-full">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="max-w-3xl space-y-8 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                      {slide.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 pt-6">
                      <CTAButton variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
                        🩺 Book Appointment
                      </CTAButton>
                      <CTAButton variant="glass" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10">
                        👨‍⚕️ Find Doctors
                      </CTAButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HeroSlider;