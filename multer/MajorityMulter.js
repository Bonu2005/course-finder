import multer from 'multer';
import path from 'path';

const rasmUpload = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    },
    destination: (req, file, cb) => {
        cb(null, "uploadsMajority");
    },
});

let upload = multer({storage:rasmUpload});

export default upload;