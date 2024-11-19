import { User } from "../models/user.model.js";

// function for addToCart product
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await User.findById(userId);
    const cartData = (await userData.cartData) || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, {
      $set: { cartData },
    });
    res.json({
      success: true,
      message: "Product added to the cart.",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// function for updateCart product
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await User.findById(userId);
    const cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(userId, { $set: { cartData } });
    res.json({ success: true, message: "Cart product updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//function for getUserCart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await User.findById(userId);
    const cartData = userData.cartData || {};
    res.json({ success: true, message: cartData });
  } catch (error) {
    console.error(error);
    res.json({ succes: false, messsage: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
