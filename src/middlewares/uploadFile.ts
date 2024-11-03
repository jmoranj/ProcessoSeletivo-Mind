import multer from 'multer';
import path from 'path';
import fs from 'fs'

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`Directory ${uploadDir} created.`);
} else {
  console.log(`Directory ${uploadDir} already exists.`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Setting upload destination to "uploads"');
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
    console.log(`Generated filename: ${filename}`);
    cb(null, filename);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  console.log(`Checking file type: ${file.mimetype}`);
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    console.error('File rejected: Not an image');
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB
  }
});


