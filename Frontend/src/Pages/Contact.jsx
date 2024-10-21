import React from "react";
import Title from "../Components/Title";
import { assets } from "../assets/frontend_assets/assets.js";
import NewsLetterBox from "../Components/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-10 my-10 mb-28">
        <img
          src={assets.contact_img}
          alt="contactus-icon"
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col items-start gap-6">
          <p className="font-semibold text-xl text-gray-800">OUR STORE</p>
          <p className="text-gray-600">
            Sataymnagar,Amraiwadi, <br /> Ahmedabad-380026, Gujarat, India
          </p>
          <p className="text-gray-600">
            Phone:972455XXXXX <br /> clothesmania@gmail.com
          </p>
          <p className="font-medium text-xl text-gray-800">
            Careers at forever
          </p>
          <p className="text-gray-600">
            Learn more about our teams and openings
          </p>
          <button className="px-8 py-3 border bg-gray-300 hover:bg-black  hover:text-white transition-all">
            Explore jobs
          </button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default Contact;
