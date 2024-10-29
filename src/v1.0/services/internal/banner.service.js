const { Banner } = require("../../models");
const logger = require("../../../utils/logger"); // Ensure logger is required as well

const uploadBanner = async (payload) => {
  try {
    const data = await new Banner(payload).save();
    if (data._id) {
      return data;
    } else {
      throw new Error("error in creating Banner");
    }
  } catch (error) {
    logger.error("something went wrong in uploadBanner:", error);
    throw error;
  }
};

const getAllBanners = async () => {
  try {
    const data = await Banner.find({});
    if (data.length > 0) {
      return data;
    } else {
      throw new Error("error in getting Banners");
    }
  } catch (error) {
    logger.error("something went wrong in getAllBanners:", error);
    throw error;
  }
};

const deleteOneBanner = async (id) => {
  try {
    const data = await Banner.deleteOne({ _id: id });
    if (data.acknowledged === true) {
      return data;
    } else {
      throw new Error("failed to delete one Banner");
    }
  } catch (error) {
    logger.error("something went wrong in deleteOneBanner:", error);
    throw error;
  }
};

module.exports = {
  uploadBanner,
  getAllBanners,
  deleteOneBanner,
};
