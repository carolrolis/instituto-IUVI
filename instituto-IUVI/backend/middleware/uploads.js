import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomeImagem = Date.now() + '-' + file.originalname;
    cb(null, nomeImagem);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Esse tipo de arquivo não é suportado'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;