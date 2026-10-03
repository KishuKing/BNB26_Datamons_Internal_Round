const express = require("express");

const upload = require("../middleware/upload");

const {
    uploadAsset
} = require("../controllers/uploadController");

const router = express.Router();

// Upload single asset
router.post(
    "/single",
    upload.single("file"),
    uploadAsset
);

module.exports = router;