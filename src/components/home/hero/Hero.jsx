import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Explore,Discover and wander with confidence ' subtitle='Traveling is not just about reaching a destination its about the experiences , memories and stories you will have along the way ' />

          <form className='flex'>
            <div className='box'>
              <span>From </span>
              <input type='text' placeholder='.....' />
            </div>
            <div className='box'>
              <span>To</span>
              <input type='text' placeholder='.....' />
            </div>
            <div className='box'>
              <span>Arrival</span>
              <input type='date' placeholder='Arriving date' />
            </div>
            <div className='box'>
              <span>Diparture</span>
              <input type='date' placeholder='Leaving date' />
            </div>
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

<Heading
  title='Explore, Discover and wander with confidence'
  subtitle='Traveling is not just about reaching a destination its about the experiences, memories and stories you will have along the way'
  style={{ textShadow: '200 20 100px rgba(190, 19, 19, 0.879)' }}
/>

export default Hero
