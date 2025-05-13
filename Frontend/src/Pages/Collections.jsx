import React, { useState, useContext, useEffect } from "react";
import { shopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/frontend_assets/assets.js";
import Title from "../Components/Title.jsx";
import ProductItem from "../Components/ProductItem.jsx";

const Collections = () => {
  const { products, search, showSearch } = useContext(shopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setcategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (search.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterProducts(productsCopy);
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
      setFilterProducts(productsCopy);
    }
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subCategory)
      );
      setFilterProducts(productsCopy);
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    const fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* {Right side} */}
      <div className="min-w-60">
        <p
          className="flex items-center text-xl cursor-pointer gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdown-icon"
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : ""}`}
          />
        </p>
        {/* {Category filters} */}
        <div
          className={`border border-gray-700 pl-5 py-3 mt-6 ${
            showFilters ? "" : "hidden"
          } sm:block bg-black text-yellow-300 rounded`}
        >
          <p className="text-xl font-medium mb-3">CATEGORIES</p>
          <div className="flex flex-col gap-2 font-light text-white">
            <p className="flex gap-2">
              <input
                type="checkbox"
                name="catogoryName"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                name="catogoryName"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                name="catogoryName"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Children
            </p>
          </div>
        </div>
        {/* {Subcategory filters} */}
        <div
          className={`border border-gray-700 pl-5 py-3 my-6 ${
            showFilters ? "" : "hidden"
          } sm:block bg-black text-yellow-300 rounded`}
        >
          <p className="text-xl font-medium mb-3">TYPE</p>
          <div className="flex flex-col gap-2 font-light text-white">
            <p className="flex gap-2">
              <input
                type="checkbox"
                name="catogoryName"
                value={"Topwear"}
                className="w-3"
                onChange={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                name="catogoryName"
                value={"Bottomwear"}
                className="w-3"
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                name="catogoryName"
                value={"Winterwear"}
                className="w-3"
                onChange={toggleSubCategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* {Right side} */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* {Sort products} */}
          <select
            name="sortProducts"
            className="border-2 border-gray-300 text-sm px-2 py-3 bg-black text-yellow-300"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value={"relevant"}>Sort by: relevent</option>
            <option value={"low-high"}>Sort by: low-high</option>
            <option value={"high-low"}>Sort by: high-low</option>
          </select>
        </div>
        {/* {Map products} */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-base gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
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
    </div>
  );
};

export default Collections;
