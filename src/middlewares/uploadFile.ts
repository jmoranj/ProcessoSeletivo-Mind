import multer from 'multer';
import path from 'path';
import fs from 'fs'

// Cria o diretorio de uploads se não existir
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// cria os sub diretorios de users e transactions
const dirs = ['users', 'transactions'];
dirs.forEach(dir => {
  const fullPath = path.join(uploadDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // determina o diretorio de upload de acordo com a rota
    const isTransaction = req.originalUrl.includes('transaction');
    const uploadPath = path.join('uploads', isTransaction ? 'transactions' : 'users');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, filename);
  }
});

// define os tipos de arquivos permitidos
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

//determine o tamanho maximo do arquivo
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB
  }
});