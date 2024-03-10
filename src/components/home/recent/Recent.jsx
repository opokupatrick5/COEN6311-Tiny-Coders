import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentTravels from "./RecentTravels"

const Recent = () => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
        <Heading title={<><span>OUR BESTS <i className='fa fa-heart'></i></span></>} subtitle='"Latest & Best sellers" will be suitable for you if you are looking for somewhere Surreal ! ' />
          <RecentTravels />
        </div>
      </section>
    </>
  )
}

export default Recent
