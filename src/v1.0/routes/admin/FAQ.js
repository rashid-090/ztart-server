const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const FaqController = require("../../controllers/FAQ");
const { multerSingleFile } = require("../../services/external/file");

// POST  : create FAQ
router.post("/create-blog", multerSingleFile("file"),makeCallback(FaqController.FAQ));

// GET  : Get all FAQs
router.get("/blogs", makeCallback(FaqController.getFaqs));

// GET  : Get one FAQ
router.get("/blog/:id", makeCallback(FaqController.oneFaq));

// PUT  : update FAQ
router.put("/update-blog/:id",multerSingleFile('file'), makeCallback(FaqController.updateFaq));

// DELETE  : delete FAQ
router.delete("/delete-blog/:id", makeCallback(FaqController.deleteFaq));



module.exports = router;