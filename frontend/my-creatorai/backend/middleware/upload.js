const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Make sure uploads directory exists
const uploadDirectory = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true
    });
}

// Store files temporarily on disk
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

// Allowed file types
const fileFilter = (req, file, cb) => {

    const allowedTypes = [

        // Images
        "image/jpeg",
        "image/png",
        "image/webp",

        // Videos
        "video/mp4",
        "video/webm",
        "video/quicktime",
        "video/x-msvideo",

        // Audio
        "audio/mpeg",
        "audio/wav",
        "audio/mp4",

        // Documents
        "application/pdf",
        "text/plain",

        // Microsoft Word
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                `File type not supported: ${file.mimetype}`
            ),
            false
        );
    }
};

// Multer configuration
const upload = multer({
    storage,

    limits: {
        // Maximum request file size: 1 GB
        fileSize: 1024 * 1024 * 1024
    },

    fileFilter
});

module.exports = upload;