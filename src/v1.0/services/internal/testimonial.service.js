const { Testimonial } = require("../../models");
const logger = require("../../../utils/logger"); // Ensure logger is required as well

const createTestimonial = async (body) => {
  try {
    const data = await Testimonial.create(body);

    if (data._id) {
      return data;
    } else {
      throw new Error("error in creating testimonial");
    }
  } catch (error) {
    console.log(error);

    logger.error("something went wrong in createTestimonial:", error);
    throw error;
  }
};

const getAllTestimonials = async () => {
  try {
    const data = await Testimonial.find({});
    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    logger.error("something went wrong in getAllTestimonials:", error);
    throw error;
  }
};

const getAllVisaSlug = async () => {
  try {
    const data = await Testimonial.find({}, 'slug');
    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    logger.error("something went wrong in getAllSlugs:", error);
    throw error;
  }
};

const editTestimonial = async (slug, body) => {
  try {
    const data = await Testimonial.updateOne({ slug: slug }, { $set: body });
    console.log("From edit backend", body);

    return data;
  } catch (error) {
    logger.error("something went wrong in editTestimonial:", error);
    throw error;
  }
};

const getOneTestimonial = async (slug) => {
  try {
    const data = await Testimonial.findOne({ slug: slug });
    if (data) {
      return data;
    } else {
      throw new Error("failed to get one testimonial");
    }
  } catch (error) {
    logger.error("something went wrong in getOneTestimonial:", error);
    throw error;
  }
};

const deleteOneTestimonial = async (id) => {
  try {
    const data = await Testimonial.deleteOne({ _id: id });
    return data;
  } catch (error) {
    logger.error("something went wrong in deleteTestimonial:", error);
    throw error;
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
  editTestimonial,
  getOneTestimonial,
  deleteOneTestimonial,
  getAllVisaSlug
};
