import React, { useContext, useState, useEffect } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../Components/Title.jsx";
import ProductItem from "../Components/ProductItem.jsx";

const Realeted = ({ category, subCategory }) => {
  const { products } = useContext(shopContext);
  const [realeted, setRealeted] = useState([]);

  useEffect(() => {
    let productCopy = products.slice();
    productCopy = productCopy.filter((item) => item.category === category);
    productCopy = productCopy.filter(
      (item) => item.subCategory === subCategory
    );
    if (productCopy.length > 0) {
      setRealeted(productCopy.slice(0, 5));
    }
  }, [category, subCategory]);

  return (
    <div className="my-24">
      <div className="flex justify-center">
        <Title text1={"REALETED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-y-6 my-5">
        {Array.isArray(realeted) && realeted.length > 0 ? (
          realeted.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <div>NO REALETED PRODUCTS !</div>
        )}
      </div>
    </div>
  );
};

export default Realeted;
