import React, { useContext, useState, useEffect } from "react";
import Title from "./Title";
import { shopContext } from "../context/ShopContext.jsx";
import ProductItem from "../Components/ProductItem.jsx";

const LatestCollection = () => {
  const { products } = useContext(shopContext);
  const [latestCollection, setLatestCollection] = useState([]);

  useEffect(() => {
    setLatestCollection(products.slice(0, 10));
  }, [ products ]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-800">
          "Be the first to wear the season’s must-haves. Our latest collection
          blends innovation with sophistication, offering something special for
          every fashion lover."
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-6">
        {latestCollection.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
