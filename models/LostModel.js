const mongo = require('mongoose')
var crypto = require('crypto'); 
var crypto = require('crypto'); 
const validator= require('validator');
const { type } = require('express/lib/response');

const LostimgSchema = new mongo.Schema(
   { 
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
      },
      
    email: {
        type: String,
        unique: true,
        required: true,
        validate:[validator.isEmail,'please provide a valid email']
    },
    phone: {
        type: String,
        required: true
    },
    image : String,
   },
   {
    collection:"LostImages"
   }


)
const Lostimg = mongo.model('Lostimg',LostimgSchema);
module.exports = Lostimg;