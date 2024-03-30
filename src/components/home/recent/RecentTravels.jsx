import React from "react"
import { list } from "../../data/Data"

const RecentTravels = () => {
  return (
    <>
      <div className='content grid3 mtop'>
        {list.map((val, index) => {
          const { cover, category, location, name, price} = val
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={cover} alt='' />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: category === "Travels" ? "#ADD8E6" : "#ff98001a", color: category === "Travels" ? "#B19CD9" : "#ff9800" }}>{category}</span>
                </div>
                <h4>{name}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {location}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{price}</button> <label></label>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentTravels
