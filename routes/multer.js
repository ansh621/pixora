const multer = require('multer');
const CloudinaryStorageModule = require('multer-storage-cloudinary');
const CloudinaryStorage = CloudinaryStorageModule.default || CloudinaryStorageModule;
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'pixora',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 1600, crop: 'limit' }],
  },
});

const upload = multer({ storage });
module.exports = upload;
