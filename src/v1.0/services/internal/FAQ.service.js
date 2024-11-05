const { FAQ } = require("../../models");
const logger = require("../../../utils/logger"); // Ensure logger is required as well

const createFaq = async (payload) => {
  try {
    const data = await new FAQ(payload).save();
    if (data._id) {
      return data;
    } else {
      throw new Error("error in creating FAQ");
    }
  } catch (error) {
    logger.error("something went wrong in createFaq:", error);
    throw error;
  }
};


const getAllBlogSlug = async () => {
  try {
    const data = await FAQ.find({},'slug');

    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    logger.error("something went wrong in getAllFaqs:", error);
    throw error;
  }
};

const getAllFaqs = async () => {
  try {
    const data = await FAQ.find({});

    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    logger.error("something went wrong in getAllFaqs:", error);
    throw error;
  }
};

const editFaqs = async (slug, body) => {
  try {
    const data = await FAQ.updateOne({ slug: slug }, { $set: body });
    return data;
  } catch (error) {
    logger.error("something went wrong in editFaqs:", error);
    throw error;
  }
};

const getOneFaq = async (slug) => {
  try {
    const data = await FAQ.findOne({ slug: slug });
    if (data) {
      return data;
    } else {
      throw new Error("failed to get one FAQ");
    }
  } catch (error) {
    logger.error("something went wrong in getOneFaq:", error);
    throw error;
  }
};

const deleteOneFaq = async (id) => {
  try {
    const data = await FAQ.deleteOne({ _id: id });
    return data;
  } catch (error) {
    logger.error("something went wrong in deleteOneFaq:", error);
    throw error;
  }
};

module.exports = {
  createFaq,
  getAllFaqs,
  editFaqs,
  getOneFaq,
  deleteOneFaq,
  getAllBlogSlug
};
