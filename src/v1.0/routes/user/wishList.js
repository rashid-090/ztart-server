const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const studentController = require("../../controllers/wishList");

// POST  : Add to cart
router.post("/", makeCallback(studentController.addToWishList));

// Get  : get all from cart
router.get("/", makeCallback(studentController.getAllFromWishList));

// DELETE  : Remove from cart
router.delete("/", makeCallback(studentController.removeFromWishList));

module.exports = router;
