const messages = require("../../config/messages");
const { NOT_FOUND, BAD_REQUEST } = require("../../config/statusCodes");
const {  WishList } = require("../models");
const {
  getWishlistByUserId,
  deleteWishlistById,
  createWishlist,
  updateWishlist,
} = require("../services/internal/wishlist");
const { getProductById } = require("../services/internal/product");

const addToWishList = async (req) => {
  const data = { itemId: [] };
  data.userId = req?.user?._id;
  const wishlist = await getWishlistByUserId(req?.user?._id);
  const priceData = await getProductById(req?.body?.itemId, "price");
  if (wishlist === null) {
    data.itemId.push(req?.body?.itemId);
    data.price = priceData.price;
    await createWishlist(data);
    return {
      message: messages.success,
    };
  }
  const isPresent = wishlist?.itemId.find((obj) => {
    if (obj._id.equals(req?.body?.itemId)) {
      return obj;
    }
  });
  if (isPresent) {
    return {
      statusCode: BAD_REQUEST,
      message: messages.WishListallreadyIn,
    };
  } else {
    const price = wishlist.price + priceData.price;
    await updateWishlist(wishlist._id, price, req?.body?.itemId);
  }
  return {
    message: messages.success,
  };
};

const removeFromWishList = async (req) => {
  const wishlist = await getWishlistByUserId(req?.user?._id);
  const priceData = await getProductById(req?.body?.itemId, "price");
  if (wishlist) {
    const isFound = wishlist?.itemId.find((obj) => {
      if (obj._id.equals(req?.body?.itemId)) {
        return obj;
      }
    });
    if (isFound) {
      const price = wishlist.price - priceData.price;
      await deleteWishlistById(wishlist._id, price, req?.body?.itemId); 
      return { message: messages?.wishItemRemovedSuccessfully };
    }
  }
  return {
    statusCode: NOT_FOUND,
    message: messages?.wishlistNotExist,
  };
};

const getAllFromWishList = async (req) => {
  const wishlist = await getWishlistByUserId(req?.user?._id);
  return {
    message: messages?.success,
    data: wishlist,
  };
};

const deleteCartByUserId = async (userId) => {
  return await WishList.deleteOne({ userId });
};

module.exports = {
  addToWishList,
  removeFromWishList,
  getAllFromWishList,
  deleteCartByUserId,
};
