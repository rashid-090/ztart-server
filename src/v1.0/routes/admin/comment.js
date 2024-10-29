const router = require("express").Router();
const makeCallback = require("../../../utils/callback");
const commentController = require("../../controllers/comment");

// GET  : Get all Comment
router.get("/", makeCallback(commentController.listComments));

// POST  : Create a Comment
router.get("/", makeCallback(commentController.addComment));

// GET  : Get specified Commet
router.get("/:id", makeCallback(commentController.viewComment));

// PUT  : update specified Commet
router.put("/:id", makeCallback(commentController.updateComments));

// DELETE  : delete specified Commet
router.delete("/:id", makeCallback(commentController.deleteComment));

module.exports = router;
