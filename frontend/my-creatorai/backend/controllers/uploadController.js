const fs = require("fs");
const uploadToCloudinary = require("../services/cloudinaryService");

const uploadAsset = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        console.log("File received:", req.file.originalname);

        // Upload to Cloudinary
        const result = await uploadToCloudinary(req.file);

        // Delete temporary local file
        fs.unlink(req.file.path, (error) => {
            if (error) {
                console.error(
                    "Failed to delete temporary file:",
                    error.message
                );
            }
        });

        return res.status(200).json({
            success: true,
            message: "Asset uploaded successfully",

            asset: {
                originalName: req.file.originalname,
                fileName: req.file.filename,

                resourceType: result.resource_type,
                format: result.format,

                size: result.bytes,

                cloudinaryUrl: result.secure_url,

                publicId: result.public_id,

                width: result.width || null,
                height: result.height || null,

                duration: result.duration || null
            }
        });

    } catch (error) {

        // Try deleting temporary file if upload failed
        if (req.file?.path) {
            fs.unlink(req.file.path, () => { });
        }

        console.error("Upload Error:", error);

        return res.status(500).json({
            success: false,
            message: "Asset upload failed",
            error: error.message
        });
    }
};

module.exports = {
    uploadAsset
};