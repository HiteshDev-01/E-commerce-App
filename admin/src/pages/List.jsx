import React from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/product/listProducts"
      );

      if (response.data.success) {
        setList(response.data.products);
      } else {
        setList("No products availablle");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch the products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Change content type to JSON
          },
        }
      );
      if(response.data.success)
        toast.success("Product removed successfully")
    } catch (error) {
      console.error(error.messsage);
      toast.error("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchList();
  }, [removeProduct]);

  return (
    <>
      <p className="mb-2">All products</p>
      <div className="flex flex-col gap-2">
        {/* {----------------- List Table title ----------------------} */}
        <div className="hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center bg-gray-300 py-1 px-2">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b className="text-center">Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* {----------------- Product List ----------------------------} */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="productImage" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p className="text-center">
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
