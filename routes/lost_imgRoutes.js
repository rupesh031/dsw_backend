const express= require('express');
const { body } = require('express-validator');
const multer= require('multer');
const uploadImage =require('../middleware/filehelpers');
const lostimgController =require('../controllers/imgController');
const router =express.Router();
const fs = require('fs')

router
.route('/upload')
.post(uploadImage,

lostimgController.addLostimg, async (req,res)=>{
    const imagePath = req.fname;
    const Imagepath = fs.readFileSync(imagePath);
    res.status(200).send("Product Added Successfully");
    try{
        const uploadedImage = new uploadImage({
            Key: req.file.filename,
            body: Imagepath,
        }).promise()
        
        fs.unlinkS  // try {ync(imagePath)
        await uploadedImage.save();
    }
    catch (err) {
        console.log("Uploding to database Failed", err);
    }

});

router.route('/getalldata')
.get(lostimgController.getAllLostimgs);
router.route('/getimages')
.get(lostimgController.getAllimgs);

router
.route('/retrieve/:Id')
.get( lostimgController.getSingleLostimg);

router
.route('/retrieve/:Id')
.delete(lostimgController.deleteLostimg);
router.route('/getfoundimg')
.get(lostimgController.getAllFoundimgs);

router.route('/uploaddata')
.post(uploadImage,lostimgController.addFoundimg,
    );


module.exports =router;



