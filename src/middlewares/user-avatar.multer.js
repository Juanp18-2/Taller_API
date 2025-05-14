const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) 
    {
        cb(null, 'src/uploads/images/posts/');
    },
    filename: function (req, file, cb)  
    {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'post-' + uniqueSuffix + path.extname(file.originalname));
    }
    });

    const fileFilter = (req, file, cb) => 
        {
            const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) 
        {
            return cb(null, true);
        }
        cb(new Error('Error: Solo imágenes están permitidas (jpeg, jpg, png, gif)'));
        };

    module.exports = {
    storage,
    fileFilter
    };