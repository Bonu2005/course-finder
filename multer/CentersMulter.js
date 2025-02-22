import multer from 'multer';
import path from 'path';

const rasmUpload = multer.diskStorage({
    filename: (req, file, cb) => {
        let fileName=path.extname(file.originalname)
        cb(null, `${Date.now()}${fileName}`)
    },
    destination: (req, file, cb) => {
        cb(null, "./uploadsCenter");
    },
});

let upload = multer({storage:rasmUpload,limits:{filesize:1024*1024*5}});

export default upload;

