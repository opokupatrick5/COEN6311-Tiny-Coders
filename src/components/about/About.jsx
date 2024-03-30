import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.png"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='How we did it ?' subtitle='If you are wondering enough, you can read this now .' />
            <p>Welcome to Concordia Travel Agency, your gateway to unforgettable journeys and experiences. Born from the vision of passionate students, our agency stands as a testament to the innovative spirit of the next generation of web developers. We are Team Tiny Coders, a group of dedicated individuals united by our love for technology, travel, and the power of connection.</p>
            <button className='btn2'>you want to know more?</button>
          </div>
          <div className='right row'>
            <img src='./aboutus.png' alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
