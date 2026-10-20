const express = require("express");
const {
  create,
  getByUser,
  remove,
} = require("../controllers/wishlistController");
const router = express.Router();

router.post("/", create);
router.get("/:userId", getByUser);
router.delete("/", remove);

module.exports = router;
