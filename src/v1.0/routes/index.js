const router = require("express").Router();
const { ensureRequestSanity } = require("../middlewares/request");
const health = require("./health");
const auth = require("./auth");
const {
    isUserAuthenticated,
    isSuperAdmin,
  } = require("../middlewares/authorizer");
const admin=require("./admin")
const user=require("./user")

// middleware
// router.use(ensureRequestSanity());

// routes
router.use("/health", health);
router.use("/auth", auth);
router.use("/admin", admin);
router.use("/user", user);

module.exports = router;
