import React, { useState } from 'react';
import '../styles/Homecontent.css';
const faqData = [
    {
        question: 'How can I rent a vehicle using this platform?',
        answer: 'Renting a vehicle is simple! Just sign up or log in to your account, browse through our wide range of vehicles available for rent, select the one that suits your needs, choose your rental dates, and complete the booking process. Its quick and easy!',
    },
    {
        question: 'Can I list my own vehicle for rent on this platform?',
        answer: 'Absolutely! If you own a vehicle and want to earn extra income, you can list it on our platform for rent. Simply create an account, provide details about your vehicle, set your rental terms and pricing, and start earning money by renting out your vehicle to our users.',
    },
    {
        question: 'Do you provide rental services with drivers?',
        answer: 'Yes, we offer rental services with drivers for your convenience. Whether you need a chauffeur for a special occasion, a local tour, or simply prefer not to drive yourself, we have got you covered. Just select the option to hire a driver during the booking process, and we will take care of the rest.',
    },
    {
        question: 'What types of vehicles are available for rent on your platform?',
        answer: 'We offer a diverse range of vehicles to suit every need and budget. From cars for city commuting to spacious Buses for family trips, and even Trucks for transport purpose, you will find it all here. We also have options for Bikes and Bicycles for various purposes.',
    },
    {
        question: 'How does the pricing for vehicle rentals work?',
        answer: 'Our pricing is transparent and competitive. The rental rates vary depending on factors such as the type of vehicle, rental duration, and additional services like insurance or driver hire. You can view the total cost before booking, and we ensure there are no hidden fees or surprises. Plus, we often offer special deals and discounts to make your rental experience even more affordable.',
    },
];
const Homecontent = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };
    return (
        <>
        {/*Features Section*/}
            <section>
                <h1 className="main-heading">Why <span style={{ color: "#1a6e9f" }}>Choose</span> Us ?</h1>
                  <div className="features-container">
                    <div className="feature">
                        <img src="assets/feature1.png" alt="Feature 1" className="feature-image" />
                        <div className="feature-content">
                            <h3>Wide Selection of Vehicles</h3>
                            <p>From compact cars for urban adventures to Trucks, Bus, Bikes and Bicycles , we offer options to match every requirement and preference.</p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="assets/feature2.png" alt="Feature 2" className="feature-image" />
                        <div className="feature-content">
                            <h3>Transparent Pricing and Policies</h3>
                            <p>We believe in transparency and honesty. Our pricing structure is straightforward, with no hidden fees or surprises. You'll know exactly what to expect before confirming your booking.</p>
                        </div>
                    </div>
                   

                </div>
                <div className="features-container">
                    <div className="feature">
                        <img src="assets/feature3.png" alt="Feature 1" className="feature-image" />
                        <div className="feature-content">
                            <h3>Safety and Reliability</h3>
                            <p>Your safety is our utmost priority. We meticulously maintain our vehicles to ensure they meet high safety standards, providing you with peace of mind during your rental experience. </p>
                        </div>
                    </div>
                    <div className="feature">
                        <img src="assets/feature4.png" alt="Feature 2" className="feature-image" />
                        <div className="feature-content">
                            <h3>24/7 Customer Service</h3>
                            <p>At our vehicle rental app, customer satisfaction is our top priority. Our dedicated support team is available to assist you every step of the way, from inquiries about vehicle availability.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <div className="testimonials-container">
                <h1>What Our <span style={{ color: "#1a6e9f" }}>Customers</span> Have To Say</h1>
                <div className="testimonial-row">
                    <div className="testimonial">
                        <div className="testimonial-image">
                            <img src="assets/testimonial1.png" alt="Testimonial 1" />
                        <h4>Eddie Munson <br /><p>24/01/2024 , Delhi</p></h4>
                        <img src="assets/4ratings.png" alt="" className='ratings'/>
                        </div>
                        <p>"Incredible selection, seamless booking process, and top-notch customer service! This app made renting a breeze. Highly recommend for anyone looking for hassle-free vehicle rentals."</p>
                        
                    </div>
                    <div className="testimonial">
                        <div className="testimonial-image">
                            <img src="assets/testimonial2.png" alt="Testimonial 2" />
                        <h4>Steve Harrington <br /><p>03/02/2024 , Mumbai</p></h4>
                        <img src="assets/4ratings.png" alt="" className='ratings'/>
                        </div>
                        <p>"Impressed with the variety of vehicles available and the user-friendly interface. Renting was a breeze, and the support team was exceptional. Will definitely use again!"</p>
                       
                    </div>
                    <div className="testimonial">
                        <div className="testimonial-image">
                            <img src="assets/testimonial3.png" alt="Testimonial 3" />
                        <h4>Max Mayfield <br /><p>15/03/2024 , Pune</p></h4>
                        <img src="assets/4ratings.png" alt="" className='ratings'/>
                        </div>
                        <p>"Outstanding experience from start to finish. Transparent pricing, reliable vehicles, and excellent service. This app exceeded my expectations. Definitely my go-to for all future rentals." </p>
                    </div>
                </div>
            </div>



            {/* FAQ Section */}
            <div className="faq-accordion">
                <h1 className='main-heading'>Frequently <span style={{ color: "#1a6e9f" }}>Asked</span> Questions</h1>
                {faqData.map((item, index) => (
                    <div key={index} className="faq-item">
                        <div
                            className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            {item.question}
                            <div className="arrow-icon">+</div>
                        </div>
                        <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                            {item.answer}
                        </div>
                    </div>
                ))}
            </div>

            {/* Brands Section */}
            <section className='Brandslogo'>
      <h1 className="main-heading">Our Fleet</h1>
      <div className="brands-container">
        <div className="brand">
          <img src="assets/ToyotaLogo.png" alt="Toyota" />
          <p>Toyota</p>
        </div>
        <div className="brand">
          <img src="assets/TataLogo.png" alt="Mahindra" />
          <p>Tata</p>
        </div>
        <div className="brand">
          <img src="assets/MarutiLogo.png" alt="Mahindra" />
          <p>Maruti</p>
        </div>
        <div className="brand">
          <img src="assets/HyundaiLogo.png" alt="Mahindra" />
          <p>Hyundai</p>
        </div>
        <div className="brand">
          <img src="assets/KiaLogo.png" alt="Mahindra" />
          <p>Kia</p>
        </div>
        <div className="brand">
          <img src="assets/HondaLogo.png" alt="Mahindra" />
          <p>Honda</p>
        </div>
        <div className="brand">
          <img src="assets/MahindraLogo.png" alt="Mahindra" />
          <p>Mahindra</p>
        </div>
        <div className="brand">
          <img src="assets/SkodaLogo.png" alt="Mahindra" />
          <p>Skoda</p>
        </div>
        <div className="brand">
          <img src="assets/AshokLeylandLogo.png" alt="Mahindra" />
          <p>Ashok Leyland</p>
        </div>
        <div className="brand">
          <img src="assets/MahindraTruckLogo.png" alt="Mahindra" />
          <p>Mahindra Trucks</p>
        </div>
        <div className="brand">
          <img src="assets/BharatBenzLogo.png" alt="Mahindra" />
          <p>BharatBenz</p>
        </div>
        <div className="brand">
          <img src="assets/EicherLogo.png" alt="Mahindra" />
          <p>Eicher</p>
        </div>
      </div>
    </section>

        </>
    )
}

export default Homecontent