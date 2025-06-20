import User from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    let { userId, productId, size } = req.body;
    if (!productId || !size) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all the required fields",
        });
    }

    const userData = await User.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });
    return res
      .status(200)
      .json({ success: true, message: "Product added to cart successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const editCart = async (req, res) => {
  try {
    let { userId, productId, size, quantity } = req.body;
    if (!productId || !size) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all the required fields",
        });
    }

    const userData = await User.findById(userId);
    let cartData = await userData.cartData;
    if (quantity > 0) {
      cartData[productId][size] = quantity;
    } else {
      delete cartData[productId][size];

      if (Object.keys(cartData[productId]).length === 0) {
        delete cartData[productId];
      }
    }

    await User.findByIdAndUpdate(userId, { cartData });
    return res
      .status(200)
      .json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const getUserCart = async (req, res) => {
  try {
    const {userId} = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide userId" });
    }

    const userData = await User.findById(userId);
    const cartData = await userData.cartData;

    return res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, editCart, getUserCart };
