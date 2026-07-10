const cloudinary = require("cloudinary").v2;

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Helper function untuk mengunggah Buffer (dari Multer memoryStorage) ke Cloudinary
 * @param {Buffer} fileBuffer - Buffer biner file dari req.file.buffer
 * @param {String} fileName - Original file name dari req.file.originalname
 * @returns {Promise<object>} - Mengembalikan promise berisi data hasil upload dari Cloudinary
 */
const uploadToCloudinary = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const cleanFileName = fileName
      ? fileName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()
      : `file_${Date.now()}`;
    const uniqueName = `${cleanFileName}_${Date.now()}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "cms_restaurant",
        resource_type: "auto",
        quality: "auto",
        fetch_format: "auto",
        public_id: uniqueName,
      },
      (err, result) => {
        if (err) return reject(err);

        resolve(result);
      },
    );

    uploadStream.end(fileBuffer);
  });
};

const deleteFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (err, result) => {
      if (err) return reject(err);

      resolve(result);
    });
  });
};

module.exports = { cloudinary, uploadToCloudinary, deleteFromCloudinary };
