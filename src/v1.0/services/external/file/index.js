const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// storage
const tmpStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads');  // Set the upload directory
    cb(null, uploadPath);  // Specify the folder to store files
  },
  filename: function (req, file, cb) {
    const fileName = generateRandomFileName(file.originalname);
    cb(null, fileName);  // Save the file with a unique name
  },
});

const tmpUpload = multer({ storage: tmpStorage });

const getFileExtension = (fileName) => {
    return fileName.split(".").pop();
};

const generateRandomFileName = (fileName) => {
    console.log(`${uuidv4()}.${getFileExtension(fileName)}`.replace(/ /g, ""));
    
    return `${uuidv4()}.${getFileExtension(fileName)}`.replace(/ /g, "");
};

// Set up Multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define where to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique file name
  }
});

// Create the middleware for a single file
const multerSingleFile = (fieldName) => {
  return multer({ storage: storage }).single(fieldName); // 'file' should match your field name
};

const multerMultipleFields = (fileNames) => {
    return tmpUpload.fields(fileNames);
};

module.exports = {
    multerSingleFile,
    multerMultipleFields,
};
