import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Contact.css'; 

const Contact = () => {
  const initialValues = { name: "", email: "", message: "" };
  const [contactValues, setContactValues] = useState(initialValues);
 const navigate = useNavigate();
  const handleChange = (event) => {
    const newObj = { ...contactValues, [event.target.name]: event.target.value };
    setContactValues(newObj);
  };

  const handleClick = () =>{
    navigate('/contact');
  }
  return (
    <>
      <Header />
      <div className="contact-body">
        <div className="contact-container">
          <div className="contact-left">
            <div>
              <h1>Get In Touch With Us</h1>
              <p>Need assistance or have any queries? Our dedicated team is here to help. Feel free to reach out to us via email, phone, or the contact form below. We're committed to providing you with the best rental experience possible.</p>
              <div className='contact-head'>
                <img src="assets/location.png" alt="" />
                <div className='contact-info'>
                  <h3>Our Location</h3>
              <p>204, Kohinoor Business Park, JP Road, Mumbai-400087</p>
              </div>
              </div>

              <div className='contact-head'>
                <img src="assets/tele.png" alt="" />
                <div className='contact-info'>
              <h3>Phone Number</h3>
              <p>022-12345678</p>
              </div>
              </div>

              <div className='contact-head'>
                <img src="assets/email.png" alt="" />
                <div className='contact-info'>
              <h3>Email Address</h3>
              <p>rentwheels.enquiries@gmail.com</p>
              </div>
              </div>
            </div>
          </div>
          <div className="contact-right">
            <div className="login_wrapper">
              <h2>Contact Form</h2>
              <p>Send us a message. We will surely get in touch with you!</p>
              <form action="#">
                <div className='input-box'>
                  <label className='label'>Name</label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={contactValues.name}
                    onChange={handleChange}
                    
                    required
                  />
                </div>
                <div className='input-box'>
                  <label className='label'>Email address</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={contactValues.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-box-message">
                  <label className='label'>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactValues.message}
                    onChange={handleChange}
                    rows={4} 
                    cols={50} 
                    style={{ resize: 'none' }} 
                    required
                  />
                </div>
                <div className="input-box button ">
                  <input type="submit" onClick={handleClick}value="Send Message" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact;
