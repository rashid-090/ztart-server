const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const FaqController = require("../../controllers/FAQ");
const { multerSingleFile } = require("../../services/external/file");
const multer = require("multer");
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
      folder: "blogs", // Specify the folder where the file will be stored in Cloudinary
      allowed_formats: ['jpeg', 'jpg', 'png'], // Limit file types
      public_id: (req, file) => Date.now() + '-' + file.originalname // File name convention
    },
  });
  
  // Initialize multer with Cloudinary storage
  const upload = multer({ storage: storage });
  

// POST  : create FAQ
router.post("/create-blog", upload.single("file"),makeCallback(FaqController.FAQ));
// GET  : Get all Blogs slug
router.get("/get-blog-slug", makeCallback(FaqController.getBlogSlug));


// GET  : Get all FAQs
router.get("/blogs", makeCallback(FaqController.getFaqs));

// GET  : Get one FAQ
router.get("/blog/:id", makeCallback(FaqController.oneFaq));

// PUT  : update FAQ
router.put("/update-blog/:id",upload.single('file'), makeCallback(FaqController.updateFaq));

// DELETE  : delete FAQ
router.delete("/delete-blog/:id", makeCallback(FaqController.deleteFaq));



module.exports = router;