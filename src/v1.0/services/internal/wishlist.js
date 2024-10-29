const mongoose = require("mongoose");
const { WishList } = require("../../models");

const createWishlist = async (data) => {
  const wishList = await new WishList(data).save();
  return wishList;
};

const getAllWishlist = async () => {
  let [wishLists, total] = await Promise.all([WishList.find(), Cart.countDocuments()]);
  return { wishLists, total };
};

const getWishlistByUserId = async (uId, select = null) => {
  const id = mongoose.Types.ObjectId(uId);
  const wishlist = await WishList.findOne({ userId: id })
    .populate("itemId")
    .select(select);
    console.log(wishlist);
  return wishlist;
};

const deleteWishlistById = async (wishListId, price, itemId) => {
  const id = mongoose.Types.ObjectId(wishListId);
  return await WishList.updateOne(
    { _id: id },
    { $pull: { itemId }, $set: { price } }
  );
};

const updateWishlist = async (wishListId, price, itemId) => {
  const id = mongoose.Types.ObjectId(wishListId);
  return await WishList.updateOne({ _id: id }, { $push: { itemId }, $set: { price } });
};

module.exports = {
  createWishlist,
  getAllWishlist,
  getWishlistByUserId,
  deleteWishlistById,
  updateWishlist,
};
