const http = require("http");
const messages = require("../../config/messages");
const logger = require("../../utils/logger");
const {
  createFaq,
  getAllFaqs,
  editFaqs,
  getOneFaq,
  deleteOneFaq,
  getAllBlogSlug,
} = require("../services/internal/FAQ.service");
const cloudinary = require("cloudinary").v2;

const FAQ = async (req) => {
  try {
    let imagePath = "";
    await cloudinary.uploader
      .upload(req?.file?.path, { secure: true })
      .then((result) => (imagePath = result.secure_url))
      .catch((err) => console.log(err));

    const testimonial = req?.body;
    const payload = {
      slug: testimonial.slug,
      subtitle: testimonial.subtitle,
      metaDescription: testimonial.metaDescription,
      metaTitle: testimonial.metaTitle,
      imageAlt: testimonial.imageAlt,
      title: testimonial.title,
      description: testimonial.description,
      status: true,
      imageURL: imagePath,
      faqs: JSON.parse(testimonial.faqs),
    };
    const data = await createFaq(payload);

    return {
      message: messages?.success,
      data: data,
    };
  } catch (error) {
    console.log(error);
    logger.error("something went wrong in faq:", error);
    return {
      statusCode: "500",
      message: messages?.internalServerError,
    };
  }
};


const getBlogSlug = async (req) => {
  try {
    const FAQs = await getAllBlogSlug();
    if (FAQs)
      return {
        message: messages?.success,
        data: FAQs,
      };
  } catch (error) {
    logger.error("something went wrong in getFaqs:", error);
    return {
      statusCode: http.statusCode.INTERNAL_SERVER_ERROR,
      message: messages?.internalServerError,
    };
  }
};


const getFaqs = async (req) => {
  try {
    const FAQs = await getAllFaqs();
    if (FAQs)
      return {
        message: messages?.success,
        data: FAQs,
      };
  } catch (error) {
    logger.error("something went wrong in getFaqs:", error);
    return {
      statusCode: http.statusCode.INTERNAL_SERVER_ERROR,
      message: messages?.internalServerError,
    };
  }
};

const oneFaq = async (req) => {
  try {
    const FAQ = await getOneFaq(req?.params?.id);
    if (FAQ)
      return {
        message: messages?.success,
        data: FAQ,
      };
  } catch (error) {
    logger.error("something went wrong in oneFaq:", error);
    return {
      statusCode: http.statusCode.INTERNAL_SERVER_ERROR,
      message: messages?.internalServerError,
    };
  }
};

const updateFaq = async (req) => {
  try {
    const blogs = JSON.parse(req.body?.data); // Use JSON.parse to retrieve the object

    let imagePath = blogs?.imageURL;
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
      subtitle: blogs.subtitle,
      title: blogs.title,
      metaTitle: blogs.metaTitle,
      metaDescription: blogs.metaDescription,
      imageAlt: blogs.imageAlt,
      description: blogs.description,
      status: true,
      imageURL: imagePath || blogs.imageURL, // Use the existing image URL if no new image is uploaded
      // questions: blogs.questions, // Include questions from the data
      faqs: blogs.faqs, // Include FAQs from the data
    };

    await editFaqs(req?.params?.id, payload);

    return {
      message: messages?.success,
    };
  } catch (error) {
    console.log(error);

    logger.error("Something went wrong in updateTestimonials:", error);
    return {
      statusCode: http.statusCode.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

const deleteFaq = async (req) => {
  try {
    const Faq = await deleteOneFaq(req?.params?.id);
    if (data)
      return {
        message: messages?.success,
      };
  } catch (error) {
    logger.error("something went wrong in deleteFaq:", error);
    return {
      statusCode: http.statusCode.INTERNAL_SERVER_ERROR,
      message: messages?.internalServerError,
    };
  }
};

module.exports = {
  FAQ,
  getFaqs,
  oneFaq,
  updateFaq,
  deleteFaq,
  getBlogSlug
};
