const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Set up storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    format: async (req, file) => "png", // File format
    public_id: (req, file) => file.originalname.split(".")[0], // File name
  },
});

// Configure Multer
const upload = multer({ storage });

module.exports = upload;
