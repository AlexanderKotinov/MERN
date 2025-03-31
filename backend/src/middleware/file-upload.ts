import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const MIME_TYPE_MAP: { [key: string]: string } = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/svg+xml': 'svg',
};

const fileUpload = multer({
  limits: { fileSize: 100000 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join('uploads', 'images'); // path.join(__dirname, '../../uploads/images');
      console.log('Saving file to:', uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      console.log('Generating unique filename');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + '.' + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    console.log('Validating file type:', file.mimetype);
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid file type!');
    cb(error, isValid);
  },
});

export default fileUpload;