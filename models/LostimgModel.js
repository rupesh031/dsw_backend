const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imageId: String,
    imagePath: String
});
module.exports = mongoose.model('Image', ImageSchema);