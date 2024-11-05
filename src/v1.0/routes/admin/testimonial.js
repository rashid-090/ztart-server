const router = require("express").Router();
const multer = require("multer");
const makeCallback = require("../../../utils/callback");
const TestimonailController = require("../../controllers/testimonial");
const { multerSingleFile } = require("../../services/external/file");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "testimonials", // Specify the folder where the file will be stored in Cloudinary
    allowed_formats: ['jpeg', 'jpg', 'png'], // Limit file types
    public_id: (req, file) => Date.now() + '-' + file.originalname // File name convention
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage: storage });

// POST  : create testimonial
router.post(
  "/create-testimonial",
  upload.single("file"),
  makeCallback(TestimonailController.testimonial)
);


// GET  : Get all visa slug
router.get(
  "/get-visa-slug",
  makeCallback(TestimonailController.getVisaSlug)
);

// GET  : Get all testimonials
router.get(
  "/testimonials",
  makeCallback(TestimonailController.getTestimonials)
);

// GET  : Get one testimonial
router.get(
  "/testimonial/:id",
  makeCallback(TestimonailController.OneTestimonial)
);

// PUT  : update testimonials
router.put(
  "/update-testimonial/:id",
  upload.single("file"),
  makeCallback(TestimonailController.updateTestimonials)
);

// DELETE  : delete testimonial
router.delete(
  "/delete-testimonial/:id",
  makeCallback(TestimonailController.deleteTestimonial)
);

module.exports = router;
