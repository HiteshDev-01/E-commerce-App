import React from "react";
import Title from "../Components/Title.jsx";
import { assets } from "../assets/frontend_assets/assets.js";
import NewsLetterBox from "../Components/NewsLetterBox.jsx"

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="about-icon"
          className="w-full md:w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-800">
          <p>
            At Clothing Mania, we're passionate about blending style and comfort
            to create a wardrobe that speaks to your individuality. Our curated
            collections feature the latest trends and timeless classics,
            ensuring you always find something that fits your personal flair.
          </p>
          <p>
            With a commitment to quality and customer satisfaction, we strive to
            make fashion accessible and enjoyable for everyone. Join us in
            celebrating your unique style and discover the perfect pieces to
            enhance your everyday look. Our Mission
          </p>
          <b className="text-gray-900">OUR MISSION</b>
          <p>
            Our mission at Clothing Mania is to empower individuals through
            fashion by providing a diverse range of high-quality, stylish
            clothing that reflects their personal identity. We aim to offer an
            exceptional shopping experience that combines trendsetting designs
            with unbeatable value, while fostering a community where everyone
            feels confident and inspired.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="flex flex-col border px-10 md:px-16 py-8 sm:py-20 gap-5">
          <b>Quality assurance</b>
          <p className="text-gray-700">
            Consistent quality assurance ensures products meet high standards,
            reducing errors and enhancing reliability. Rigorous testing and
            evaluation guarantee that every detail aligns with customer
            expectations. This commitment fosters trust and long-term
            satisfaction.
          </p>
        </div>
        <div className="flex flex-col border px-10 md:px-16 py-8 sm:py-20 gap-5">
          <b>Convenience</b>
          <p className="text-gray-700">
            Convenience simplifies processes for customers, saving them time and
            effort. Streamlined systems and easy access to services make
            interactions smooth and hassle-free. Prioritizing convenience
            enhances overall customer experience and loyalty.
          </p>
        </div>
        <div className="flex flex-col border px-10 md:px-16 py-8 sm:py-20 gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-700">
            Exceptional customer service goes beyond solving problems; it
            anticipates needs and provides personalized support. Friendly,
            responsive, and knowledgeable staff create memorable interactions.
            Outstanding service builds lasting relationships and drives customer
            retention.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
