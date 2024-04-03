import React, { useState, useEffect } from "react";
import Heading from "../../common/Heading";
import "./hero.css";

const images = [
  "/images/p-9.jpg",  
  "/images/p-2.jpg",
  "/images/p-3.jpg",
  "/images/p-4.jpg",
  "/images/p-5.jpg",
  "/images/p-6.jpg",
  "/images/p-8.jpg",
  "/images/p-7.jpg",
  "/images/p-10.jpg",
  "/images/p-1.jpg",

];

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(currentBg => (currentBg + 1) % images.length);
    }, 5000); // 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className='hero' style={{ backgroundImage: `url(${images[currentBg]})` }}>
        <div className='container'>
          <Heading 
            title='Explore, Discover and wander with confidence' 
            subtitle='Traveling is not just about reaching a destination its about the experiences, memories and stories you will have along the way'
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          />
          <form className='flex'>
            <div className='box'>
              <span>From </span>
              <input type='text' placeholder='Enter starting location...' />
            </div>
            <div className='box'>
              <span>To</span>
              <input type='text' placeholder='Enter destination...' />
            </div>
            <div className='box'>
              <span>Arrival</span>
              <input type='date' placeholder='Arriving date' />
            </div>
            <div className='box'>
              <span>Departure</span>
              <input type='date' placeholder='Leaving date' />
            </div>
            <button className='btn1'>
              <i className='fa fa-search'></i> Search
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
