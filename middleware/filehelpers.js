const multer =require('multer');
const path =require('path');
const Found = require('../models/FoundModel');
const uploadPath = path.join("public", Found.ImagePath);

// const storageImage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images');
//     },
//     // filename: (req, file, cb) => {
//     //     const fname = `image_${(new Date).getTime()}.${file.mimetype.replace('image/', '')}`
//     //     cb(null, fname);
//     //     req.fname = 'uploaded/images/' + fname;
//     // }
    // filename: (req, file, cb) => {
    //     const name = file.originalname
    //       .toLowerCase()
    //       .split(" ")
    //       .join("-");
    //     const ext = MIME_TYPE_MAP[file.mimetype];
    //     cb(null, name + "-" + Date.now() + "." + ext);
//       }
// });

// const uploadImage = multer({ 
//     storage: storageImage,
    // fileFilter:(req, file, cb)=>{
    //     if(
    //         file.mimetype == 'image/jpeg' ||
    //         file.mimetype == 'image/jpg' ||
    //         file.mimetype == 'image/png' ||
    //         file.mimetype == 'image/gif'
    
    //     ){
    //         cb(null, true)
    //     }
    //     else{
    //         cb(null, false);
    //         cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
    //     }
    //    }
//     }).single("image");

// module.exports = {uploadImage }


// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg"
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("The media type is incorrect");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "images/");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname
//       .toLowerCase()
//       .split(" ")
//       .join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + "-" + Date.now() + "." + ext);
//   }
// });
// const storageImage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploaded/images/');
//     },
    // filename: (req, file, cb) => {
    //     const fname = `image_${(new Date).getTime()}.${file.mimetype.replace('image/', '')}`
    //     cb(null, fname);
    //     req.fname = 'images/' + fname;
//     }
// });
const storageImage = multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
        // const name = file.originalname
        //   .toLowerCase()
        //   .split(" ")
        //   .join("-");
        // const ext = MIME_TYPE_MAP[file.mimetype];
        // cb(null, name + "-" + Date.now() + "." + ext);
        cb(null, `${Date.now()}--${file.originalname}`);
    }
    
});
// const multer = require('multer');
// const upload = multer({ storage: storage });



// module.exports = multer({ storage: storageImage }).single("image");
module.exports = multer({ storage: storageImage }).single("img");