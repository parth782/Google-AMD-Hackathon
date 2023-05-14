const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ensureFarmerAuthenticated } = require("../middleware/auth");
const Inventory = require('../models/Inventory');
var multer = require("multer");
var path = require("path");
var fs = require("fs");
const Farmer=require("../models/Farmer");


// VALIDATING FILE EXTENSION
function checkFileType(file, cb, type) {
    const filetypes = type;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
}

// MULTER STORAGE FOR FILES
var storage = multer.diskStorage({
    destination: './static/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// MULTER FILE UPLOADING
var upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb, /jpeg|jpg|png|gif/);
    }
}).single("imgFile");

// DELETING FILES ON ERROR
async function delete_on_err(path) {
    try {
        fs.unlinkSync('./static/uploads/' + path);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}


// INVENTORY FOR HOMPEAGE
router.get("/all", async (req, res) => {
    try {
        const inventory = await Inventory.findAll({nest:true,raw: true,include:Farmer, where: { isDeleted: false } });
        return res.status(200).json({ status: "success", inventory: inventory });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
    }
})


// INVENTORY APIS
router.get("/", ensureFarmerAuthenticated, async (req, res) => {
    try {
        const inventory = await Inventory.findAll({ raw: true, where: { farmerId: req.user.id, isDeleted: false } });
        return res.status(200).json({ status: "success", inventory: inventory });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Internal Server Error");
    }
});

// EDIT DATA CALL
router.get("/edit/:id", ensureFarmerAuthenticated, async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ raw: true, where: { id: req.params.id, isDeleted: false } });
        return res.status(200).json({ status: "success", inventory: inventory });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// DELETE DATA
router.delete("/delete/:id", ensureFarmerAuthenticated, async (req, res) => {
    try {
        await Inventory.update({ isDeleted: true }, { where: { id: req.params.id } });
        return res.status(200).json({ status: "success", msg: "Record Deleted Successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// ADD DATA
router.post("/", ensureFarmerAuthenticated, async (req, res) => {

    // UPLOAD FILE
    upload(req, res, async (err) => {
        if (err) {
            if (req.file != undefined) {
                await delete_on_err(req.file.filename);
            }
            console.log(err);
            return res.status(500).json({ msg: "Some Error Occured1" });
        }
        else {

            try {


                const { name, quantity, pricePerUnit, unit, description } = req.body;
                if (name.length < 3) {
                    if (req.file != undefined) {
                        await delete_on_err(req.file.filename);
                    }
                    return res.status(200).json({ msg: "Name should contain 3 letters" });
                }
                else if (quantity < 1) {
                    if (req.file != undefined) {
                        await delete_on_err(req.file.filename);
                    }
                    return res.status(200).json({ msg: "Quantity should not be zero" });
                }
                else if (unit < 1) {
                    if (req.file != undefined) {
                        await delete_on_err(req.file.filename);
                    }
                    return res.status(200).json({ msg: "Unit should not be zero" });
                }
                else if (pricePerUnit < 1) {
                    if (req.file != undefined) {
                        await delete_on_err(req.file.filename);
                    }
                    return res.status(200).json({ msg: "PricePerUnit should not be zero" });
                }

                const inventory = await Inventory.create({
                    name: name,
                    quantity: quantity,
                    pricePerUnit: pricePerUnit,
                    unit: unit,
                    farmerId: req.user.id,
                    description: description,
                    imgFile: req.file != undefined ? req.file.filename : null,
                });
                await inventory.save();
                return res.status(200).json({ status: "success", msg: "Record Added Successfully" });
            } catch (err) {
                if (req.file != undefined) {
                    await delete_on_err(req.file.filename);
                }
                console.error(err.message);
                res.status(500).send("Internal Server Error");
            }
        }
    })

})

// EDIT DATA FOR INVENTORY
router.post("/edit/:id", ensureFarmerAuthenticated, async (req, res) => {

    // FUNCTION FOR UPLOADING 
    upload(req, res, async (err) => {

        if (err) {
            if (req.file != undefined) {
                await delete_on_err(req.file.filename);
            }
            return res.status(500).json({ msg: "Some Error Occured" });
        }

        try {
            const { name, quantity, pricePerUnit, unit, description } = req.body;
            if (name.length < 3) {
                if (req.file != undefined) {
                    await delete_on_err(req.file.filename);
                }
                return res.status(200).json({ msg: "Name should contain 3 letters" });
            }
            else if (quantity < 1) {
                if (req.file != undefined) {
                    await delete_on_err(req.file.filename);
                }
                return res.status(200).json({ msg: "Quantity should not be zero" });
            }
            else if (unit < 1) {
                if (req.file != undefined) {
                    await delete_on_err(req.file.filename);
                }
                return res.status(200).json({ msg: "Unit should not be zero" });
            }
            else if (pricePerUnit < 1) {
                if (req.file != undefined) {
                    await delete_on_err(req.file.filename);
                }
                return res.status(200).json({ msg: "PricePerUnit should not be zero" });
            }
            const record = await Inventory.findOne({ raw: true, where: { id: req.params.id, farmerId: req.user.id } });

            await Inventory.update({
                name: name,
                quantity: quantity,
                pricePerUnit: pricePerUnit,
                unit: unit,
                description: description,
                imgFile: req.file != undefined ? req.file.filename : record.imgFile,
            }, { where: { id: req.params.id, farmerId: req.user.id } });
            if (req.file != undefined) {
                await delete_on_err(record.imgFile);
            }
            return res.status(200).json({ status: "success", msg: "Record Updated Successfully" });
        } catch (err) {
            if (req.file != undefined) {
                await delete_on_err(req.file.filename);
            }
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }

    })

})

// ORDER APIS

module.exports = router;
