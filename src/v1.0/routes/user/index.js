const router = require("express").Router();
const commentManagement = require("./comment");
const cartManagement = require("./cart");
const productManagement = require("./product");
const wishlistManagement = require("./wishList");
const testimonialManagment = require("../admin/testimonial");
const FAQManagment = require("../admin/FAQ");

router.use("/product", productManagement);
router.use("/comment", commentManagement);
router.use("/cart", cartManagement);
router.use("/wishlist", wishlistManagement);
router.use("/testimonial", testimonialManagment);
router.use("/blog", FAQManagment);

module.exports = router;