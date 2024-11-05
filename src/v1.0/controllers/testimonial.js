const upload = require("../../config/multer");
const http = require("http");
const messages = require("../../config/messages");
const logger = require("../../utils/logger");
const {
  createTestimonial,
  getAllTestimonials,
  editTestimonial,
  getOneTestimonial,
  deleteOneTestimonial,
  getAllVisaSlug,
} = require("../services/internal/testimonial.service");
const cloudinary = require("cloudinary").v2;
const testimonial = async (req) => {
  try {
    let imagePath = "";
    if (req.file?.path) {
      await cloudinary.uploader
        .upload(req.file.path, { secure: true })
        .then((result) => (imagePath = result.secure_url))
        .catch((err) => {
          console.error("Error uploading to Cloudinary:", err);
          throw new Error("Image upload failed");
        });
    }
    const testimonial = req?.body;

    const payload = {

      slug: testimonial.slug,
      country: testimonial.country,
      metaTitle: testimonial.metaTitle,
      metaDescription: testimonial.metaDescription,
      about: testimonial.about,
      title: testimonial.title,
      description: testimonial.description,
      status: true,
      imageURL: imagePath,
      imageAlt: testimonial.imageAlt,
      questions: JSON.parse(testimonial.questions),
      faqs: JSON.parse(testimonial.faqs),
    };

    const data = await createTestimonial(payload);

    return {
      message: messages?.success,
      data: { ...data.toObject(), imagePath },
    };
  } catch (error) {
    console.log(error.message);

    logger.error("something went wrong in testimonial:", error);
    return {
      statusCode: "500",
      message: error.message,
    };
  }
};

const getVisaSlug = async (req) => {
  try {
    const testimonials = await getAllVisaSlug();
    if (testimonials)
      return {
        message: messages?.success,
        data: testimonials,
      };
  } catch (error) {
    console.log(error);

    logger.error("something went wrong in getTestimonials:", error);
    return {
      statusCode: 500,
      message: messages?.internalServerError,
    };
  }
};

const getTestimonials = async (req) => {
  try {
    const testimonials = await getAllTestimonials();
    if (testimonials)
      return {
        message: messages?.success,
        data: testimonials,
      };
  } catch (error) {
    console.log(error);

    logger.error("something went wrong in getTestimonials:", error);
    return {
      statusCode: 500,
      message: messages?.internalServerError,
    };
  }
};

const OneTestimonial = async (req) => {
  try {
    const testimonial = await getOneTestimonial(req?.params?.id);
    if (testimonial)
      return {
        message: messages?.success,
        data: testimonial,
      };
  } catch (error) {
    logger.error("something went wrong in getTestimonials:", error);
    return {
      statusCode: http.statusCode.INTERNAL_SERVER_ERROR,
      message: messages?.internalServerError,
    };
  }
};

const updateTestimonials = async (req) => {
  try {
    const testimonial = JSON.parse(req.body.data); // Use JSON.parse to retrieve the object

    let imagePath = testimonial?.imageURL;

    // Check if a file is uploaded
    if (req?.file?.path) {
      await cloudinary.uploader
        .upload(req.file.path, { secure: true })
        .then((result) => (imagePath = result.secure_url))
        .catch((err) => {
          console.error("Error uploading to Cloudinary:", err);
          throw new Error("Image upload failed");
        });
    }

    // Parse the JSON data from req.body


    // Prepare the payload for the database
    const payload = {
      country: testimonial.country,
      subtitle: testimonial.subtitle,
      title: testimonial.title,
      metaTitle: testimonial.metaTitle,
      metaDescription: testimonial.metaDescription,
      description: testimonial.description,
      status: true,
      imageAlt: testimonial.imageAlt,
      imageURL: imagePath, // Use the existing image URL if no new image is uploaded
      questions: testimonial.questions, // Include questions from the data
      faqs: testimonial.faqs, // Include FAQs from the data
      about: testimonial.about,
    };


    await editTestimonial(req?.params?.id, payload);

    return {
      message: messages?.success,
    };
  } catch (error) {
    console.log(error);

    logger.error("Something went wrong in updateTestimonials:", error);
    return {
      statusCode: http.statusCode.INTERNAL_SERVER_ERROR,
      message: messages?.internalServerError,
    };
  }
};

const deleteTestimonial = async (req) => {
  try {
    const testimonial = await deleteOneTestimonial(req?.params?.id);
    if (testimonial)
      return {
        message: messages?.success,
      };
  } catch (error) {
    logger.error("something went wrong in getTestimonials:", error);
    return {
      statusCode: http.statusCode.INTERNAL_SERVER_ERROR,
      message: messages?.internalServerError,
    };
  }
};

module.exports = {
  testimonial,
  getTestimonials,
  updateTestimonials,
  OneTestimonial,
  deleteTestimonial,
  getVisaSlug
};
