const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (file) => {

    if (!file) {
        throw new Error("No file provided");
    }

    const isVideo = file.mimetype.startsWith("video/");
    const isAudio = file.mimetype.startsWith("audio/");

    let resourceType = "auto";

    if (isVideo) {
        resourceType = "video";
    } else if (isAudio) {
        resourceType = "video";
    }

    let result;

    // Large videos
    if (isVideo && file.size > 100 * 1024 * 1024) {

        result = await cloudinary.uploader.upload_large(
            file.path,
            {
                resource_type: "video",
                folder: "creatorai/videos",
                chunk_size: 20 * 1024 * 1024
            }
        );

    } else {

        // Normal uploads
        result = await cloudinary.uploader.upload(
            file.path,
            {
                resource_type: resourceType,
                folder: `creatorai/${isVideo ? "videos" : "assets"}`
            }
        );
    }

    return result;
};

module.exports = uploadToCloudinary;