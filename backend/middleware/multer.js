const multer = require('multer'); // For handling file uploads
const { CloudinaryStorage } = require('multer-storage-cloudinary');
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dyrmjjb6i', 
  api_key: '993336669154165', 
  api_secret: 'rrkTzfYBq9DtDRv8lEBbn52kHY0' 
});


// Create multer storage engine for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'form-builder', // optional
  },
});

const parser = multer({ storage });

// Define your image upload controller
exports.uploadImage = catchError(async (req, res, next) => {
  // Use the 'parser' middleware to handle the image upload
  parser.single('image')(req, res, async (error) => {
    if (error) {
      return next(error);
    }

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

next();
  });
});
