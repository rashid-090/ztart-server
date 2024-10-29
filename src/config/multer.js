const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Set up your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET  // Cloudinary API secret
});

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'testimonials', // Folder in Cloudinary where images will be stored
    allowed_formats: ['jpeg', 'jpg', 'png'], // Limit file types
    public_id: (req, file) => Date.now() + '-' + file.originalname // File name convention
  }
});

// Set up multer with Cloudinary storage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(file.originalname.toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    
    if (extname && mimeType) {
      cb(null, true); // Accept file
    } else {
      cb(new Error('Only images are allowed (jpeg, jpg, png)!')); // Reject file
    }
  }
}).single('image'); // Single file upload, 'image' is the form-data key

module.exports = upload;
