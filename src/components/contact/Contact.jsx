import React from "react"
import img from "../images/pricing.png"
import Back from "../common/Back"
import "./contact.css"

const Contact = () => {
  return (
    <>
      <section className='contact mb'>
        <Back name='Contact Us' title='Get Helps & Friendly Support' cover={img} />
        <div className='container'>
          <form className='shadow'>
            <h4>Fillup The Form</h4> <br />
            <div>
              <input type='text' placeholder='your Name' />
              <input type='text' placeholder='your Email' />
            </div>
            <input type='text' placeholder='Subject' />
            <textarea cols='30' placeholder='write to us here!' rows='10'></textarea>
            <button>Submit Request</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
