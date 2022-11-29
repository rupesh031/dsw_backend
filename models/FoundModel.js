const mongo = require('mongoose')
var crypto = require('crypto'); 
const validator= require('validator');
const path = require("path");
const ImagePath = "FoundImage";
const FoundimgSchema = new mongo.Schema({
    // _id: mongo.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
      },
    
    email: {
        type: String,
        unique: true,
        required: true,
        validate:[validator.isEmail,'please provide a valid email']
    },
    phone: {
        type: String,
        required: true,
    },
    
    // img: { data: Buffer,
    //      contentType: String}
    img: {
        type: String,
        required: true,   
    }
}, {
    timestamps: true

},
{
    collection:"foundimgs"
}
);
FoundimgSchema.virtual("imagePath").get(function () {
    return path.join("/", ImagePath, this.img);
  });

const Foundimg = mongo.model('foundimgs',FoundimgSchema);
module.exports = Foundimg;
module.exports.ImagePath=ImagePath;