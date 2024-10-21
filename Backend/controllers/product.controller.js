import { v2 as Cloudinary } from "cloudinary";
import { productModel } from "../models/prpduct.model.js";

// function for add product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      sizes,
      bestSeller,
      category,
      subCategory,
      date,
      price,
    } = req.body;

    if (
      !name ||
      !price ||
      !description ||
      !subCategory ||
      !category ||
      !sizes
    ) {
      return res.json({ success: false, message: "All filed are required !" });
    }

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await Cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    console.log(imagesUrl);

    if (!imagesUrl && !imagesUrl.length) {
      return res.json({
        success: false,
        message: "Something went wrong when generating the image URL !",
      });
    }

    const productData = {
      name,
      description,
      bestSeller: bestSeller === "true" ? true : false,
      category,
      subCategory,
      price: Number(price),
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    return res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: `Failed to add the product:${error.message}`,
    });
  }
};

// function for remove product
export const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.json({ success: false, message: "Product id is required !" });
    await productModel.findByIdAndDelete(id);
    return res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product info
export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId)
      return res.json({ success: false, message: "Product is is required !" });
    const productData = await productModel.findById(productId);
    if (!productData)
      return res.json({
        success: false,
        message: "Product is not available !",
      });
    res.json({ success: true, message: `Product data:${productData}` });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, messagge: "Failed to fetch to the product" });
  }
};

// function for list products
export const listProduct = async (req, res) => {
  try {
    const allProducts = await productModel.find({});
    if (!allProducts)
      return res.json({ success: false, message: "Product not available !" });
    res.json({
      success: true,
      products: allProducts,
      message: "All Products fetched successfully !",
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: `Failed to fetch the products:${error.message}`,
    });
  }
};
