import React from "react";

const NewsLetterBox = () => {
  const onSubmitFolder = (event) => {
    event.preventDefault();
  }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-700 mt-3">
        Be the first to know about our newest collections, exclusive sales, and
        fashion tips! Subscribe to our newsletter for a dose of style
        inspiration and special offers that you won’t want to miss. Join our
        fashion-forward community today!
      </p>

      <form onSubmit={onSubmitFolder} className="flex items-center w-full sm:w-1/2 mx-auto gap-3 my-6 pl-3">
        <input
          type="email"
          name="emailId"
          placeholder="Enter your email"
          className="w-full outline-none px-5 py-3 border sm:flex-1 border-gray-950 rounded-sm placeholder:text-gray-700"
          required
        />
        <button
          type="submit"
          className="bg-black text-[#f7e30ad3] px-5 py-3 font-medium rounded-sm"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
