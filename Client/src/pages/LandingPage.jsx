import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import {useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate= useNavigate()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    fade: true,
    arrows:true,
   
  };

  return (
    <>
      <section className='w-full p-1  relative'>
        <Slider {...settings}>

          <div>
            <img
              src='/Images/HeroBanner.png'
              alt='Hero Banner'
              className='w-full h-[80vh] object-contain p-2'
            />
          </div>
          <div>
            <img
              src='/Images/Sale.png'
              alt='Hero Banner'
              className='w-full h-[80vh] object-contain p-2'
            />
          </div>
          <div>
            <img
              src='/Images/Slider-Image-1.png'
              alt='Hero Banner'
              className='w-full h-[80vh] object-contain p-2'
            />
          </div>
          <div>
            <img
              src='/Images/Slider-Image-2.png'
              alt='Hero Banner'
              className='w-full h-[80vh] object-contain p-2'
            />
          </div>
          <div>
            <img
              src='/Images/Slider-Image-3.png'
              alt='Hero Banner'
              className='w-full h-[80vh] object-contain p-2'
            />
          </div>
        </Slider>
      </section>

      <section className='w-full h-full flex flex-col items-center justify-center mt-5'>
        <span className='text-2xl lg:text-3xl text-customPalette-black p-8 text-nowrap '>
          Your One Stop Shopping Site
        </span>
        <button
          onClick={() => {
            window.scrollTo(0, 0); // Reset scroll to top
            navigate('/products'); // Navigate to the new page
          }}
          className='p-2 bg-customPalette-yellow m-4 text-center text-customPalette-black
  hover:bg-customPalette-blue text-2xl font-medium transition-all'
        >
          Explore
        </button>
      </section>
    </>
  );
};

export default LandingPage;
