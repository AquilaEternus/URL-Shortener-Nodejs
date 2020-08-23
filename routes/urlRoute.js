const express = require("express");
const urlController = require("../controller/urlController");

const router = express.Router();

router.get("/", urlController.url_get);
router.post("/", urlController.url_post);
router.get("/:shortURL", urlController.url_shorturl_get);

module.exports = router;
