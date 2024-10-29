const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const ProductController = require("../../controllers/product");
const { multerSingleFile } = require("../../services/external/file");


// PUT  : update specified product
router.post("/upload",multerSingleFile("file"), makeCallback(ProductController.uploadImage));

// GET  : Get all product
router.get("/", makeCallback(ProductController.listProducts));

// POST  : Create a product
router.post("/", makeCallback(ProductController.addProduct));

// GET  : Get specified product
router.get("/:id", makeCallback(ProductController.viewProduct));


// PUT  : update specified product
router.put("/:id", makeCallback(ProductController.updateProducts));


// DELETE  : delete specified product
router.delete("/:id", makeCallback(ProductController.deleteProduct));

module.exports = router;
