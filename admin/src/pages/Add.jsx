import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");

  const handleSizeClick = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bestSeller", bestseller);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("category", category);
      formData.append("subCategory", subcategory);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct way to pass token in headers
            "Content-Type": "multipart/form-data", // Setting the correct content type
          },
        }
      );

      if (response && response.data && response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="uploadIcon"
            />
          </label>
          <label htmlFor="image2">
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="uploadIcon"
            />
          </label>
          <label htmlFor="image3">
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="uploadIcon"
            />
          </label>
          <label htmlFor="image4">
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="uploadIcon"
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[540px] px-3 py-2"
          type="text"
          placeholder="type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[540px] px-3 py-2"
          placeholder="write content here"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setSubcategory(e.target.value)}
            className="px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Bottomwear">Bottomwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size}>
              <p
                className={`${sizes.includes(size)
                  ? "bg-pink-300 text-black"
                  : "bg-black text-white"
                  } px-3 py-2 cursor-pointer`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 w-full mt-5">
          <input
            checked={bestseller}
            onChange={() => setBestseller((prev) => !prev)}
            type="checkbox"
          />
          <label>Add to bestseller</label>
        </div>
        <button className="w-28 py-3 mt-2 bg-slate-700 text-white">ADD</button>
      </div>
    </form>
  );
};

export default Add;
