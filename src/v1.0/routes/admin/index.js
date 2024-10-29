const router = require("express").Router();
const testimonialManagment = require("./testimonial");
const FAQManagment = require("./FAQ");

router.use("/testimonial", testimonialManagment);
router.use("/blog", FAQManagment);

module.exports = router;
