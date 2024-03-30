import React from "react"
import Back from "../common/Back"
import RecentTravels from "../home/recent/RecentTravels"
import "../home/recent/recent.css"
import img from "../images/about.png"

const Blog = () => {
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Blog' title='Blog Grid - Our Blogs' cover={img} />
        <div className='container recent'>
          <RecentTravels />
        </div>
      </section>
    </>
  )
}

export default Blog
