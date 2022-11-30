const Lostimg = require("../models/LostModel");
const Image = require("../models/LostimgModel");
const Foundimg = require("../models/FoundModel");
const fs = require("fs");
const path = require("path");
// const validatorFunctions = require('../utils/validator-functions');

exports.getAllLostimgs = async (req, res, next) => {
  try {
    const list = await Lostimg.find();
    res.status(200).json({ message: "List of Lostimgs", list: list });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Recovery failed!" });
  }
};
exports.getAllimgs = async (req, res, next) => {
  try {
    const list = await Image.find();
    res.status(200).json({ message: "List of Lostimgs", list: list });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Recovery failed!" });
  }
};

exports.getSingleLostimg = async (req, res, next) => {
  const LostimgId = req.params.LostimgId;
  try {
    const Lostimg = await Lostimg.findById(LostimgId);
    if (!Lostimg) {
      return res.status(404).json({ message: "Lostimg not found!" });
    }
    res.status(200).json({ message: "Retrieved Lostimg", Lostimg: Lostimg });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Recovery failed!" });
  }
};

exports.addLostimg = async (req, res, next) => {
  // const errorMessage = validatorFunctions.validators(req, res);
  // console.log('Retrieved errorMessage', errorMessage);
  // if (errorMessage) {
  //     return res.status(422).json({ message: 'Validation error', error: errorMessage });
  // }
  if (!req.file) {
    return res.status(422).json({ message: "Please add an image!" });
  }
  try {
    newImage = await Image({ imagePath: req.fname }).save();
    const newProduct = new Lostimg({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      description: req.body.description,
      image: newImage._id,
    });
    await newProduct.save();
    next();
  } catch (error) {
    console.log(error);
  }

  // const Lostimg = new Lostimg({
  //     name: req.body.name,
  //     description: req.body.description,
  //     email: req.body.email,
  //     phone: req.body.phone,
  //     photoUrl: req.file.path.replace("\\", "/") // If you are on Linux or Mac just use req.file.path
  // });

  // try {
  //     const result = await Lostimg.save()
  //     console.log('result', result);
  //     return res.status(201).json({
  //         message: "Lostimg is successfully added!",
  //         Lostimg: result
  //     });
  // } catch (error) {
  //     console.log('error', error);
  //     if (req.file) {
  //         validatorFunctions.deleteImage(Lostimg.photoUrl);
  //     }
  //     res.status(500).json({ message: 'Creation failed!' });
  // }
};

exports.updateLostimg = async (req, res, next) => {
  const errorMessage = validatorFunctions.validators(req, res);
  console.log("Retrieved errorMessage", errorMessage);
  if (errorMessage) {
    return res
      .status(422)
      .json({ message: "Validation failed!", error: errorMessage });
  }

  let photoUrl = req.body.image;
  if (req.file) {
    photoUrl = req.file.path.replace("\\", "/");
    // .replace("\\", "/");
  }
  if (!photoUrl) {
    return res.status(422).json({ message: "Please add an image!" });
  }

  const LostimgId = req.params.LostimgId;
  try {
    const Lostimg = await Lostimg.findById(LostimgId);
    if (!Lostimg) {
      validatorFunctions.deleteImage(req.file.path.replace("\\", "/"));
      return res.status(404).json({ message: "Lostimg not found!" });
    }
    if (photoUrl !== Lostimg.photoUrl) {
      validatorFunctions.deleteImage(Lostimg.photoUrl);
    }
    Lostimg.name = req.body.name;
    Lostimg.description = req.body.description;
    Lostimg.email = req.body.email;
    Lostimg.phone = req.body.phone;
    Lostimg.photoUrl = photoUrl;
    const result = await Lostimg.save();
    res.status(200).json({
      message: "Modification successfully completed!",
      Lostimg: result,
    });
  } catch (error) {
    console.log("error", error);
    if (req.file) {
      validatorFunctions.deleteImage(Lostimg.photoUrl);
    }
    res.status(500).json({ message: "Update failed!" });
  }
};

exports.deleteLostimg = async (req, res, next) => {
  const LostimgId = req.params.LostimgId;
  try {
    const Lostimg = await Lostimg.findById(LostimgId);
    if (!Lostimg) {
      return res.status(404).json({ message: "Lostimg not found!" });
    }

    validatorFunctions.deleteImage(Lostimg.photoUrl);
    await Lostimg.findByIdAndRemove(LostimgId);
    res.status(200).json({ message: "Deletion completed successfully!" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Delete failed!" });
  }
};

exports.addFoundimg = async (req, res) => {
  // const errorMessage = validatorFunctions.validators(req, res);
  // console.log('Retrieved errorMessage', errorMessage);
  // if (errorMessage) {
  //     return res.status(422).json({ message: 'Validation error', error: errorMessage });
  // }
  console.log("Data uploaded");
  console.log(req);
  if (!req.file) {
    return res.status(422).json({ message: "Please add an image!" });
  }
  // try {
  //     let image =req.file
  //     let newProduct =new Foundimgs.Foundimg();
  //     newProduct.name= req.body.name;
  //     newProduct.email=req.body.email;
  //     newProduct.phone=req.body.phone;
  //     newProduct.description=req.body.description;
  //     newProduct.img.data=fs.readFileSync(path.join(__dirname + '/uploads/' + image.filename));
  //     newProduct.img.contentType='image/jpg';
  //     await newProduct.save();
  //     res.json({ message: 'New image added to the db!' });

  // }
  // catch (error) {
  //     console.log(error);

  // }
  const filename = req.file != null ? req.file.filename : null;
  const file = new Foundimg({
    name: req.body.name,
    desc: req.body.desc,
    email: req.body.email,
    phone: req.body.phone,
    img: filename,
  });
  await file
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "image Posted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getAllFoundimgs = async (req, res, next) => {
  console.log("getting found");
  try {
    const data = await Foundimg.find();
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Recovery failed!" });
  }
};

exports.addimg = async (req, res, next) => {
  console.log("upload request");
  const filename = req.file != null ? req.file.filename : null;
  console.log(filename);
};
