const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const jwt = require("jsonwebtoken");
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const { body, validationResult } = require("express-validator");
const { ensureConsumerAuthenticated } = require('../middleware/auth');
const Consumer = require('../models/Consumer');
const {Sequelize}=require("sequelize");
const Op = Sequelize.Op;


router.post('/login', body("mobileNo").isLength({ min: 10 }).withMessage("Mobile No must be of length 10"), async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const status = await client.verify.services(process.env.TWILIO_VERIFICATION_SID)
            .verifications
            .create({ to: '+91' + req.body.mobileNo, channel: 'sms' })
            .then((verification) => {
                res.status(200).json({ status:"success",success: "OTP Sent Successfully" });
                return;
            });

        return;
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/otp-verify", body("otp").isLength({ min: 6 }).withMessage("OTP must be of length 6"), body("mobileNo").isLength({ min: 10 }).withMessage("Mobile No must be of length 10"), async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const temp = await client.verify.services(process.env.TWILIO_VERIFICATION_SID)
            .verificationChecks
            .create({ to: '+91' + req.body.mobileNo, code: req.body.otp });
        console.log(temp);
        if (temp.status == "approved") {
            var consumer = await Consumer.findOne({ raw: true, where: { mobileNo: req.body.mobileNo } });
            if (!consumer) {
                var consumer = await Consumer.create({
                    mobileNo: req.body.mobileNo
                });
                await consumer.save();
            }
            const payload = {
                mobileNo: req.body.mobileNo,
                role: "consumer",
                id: consumer.id
            };
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ status:"success",token: token, role: "consumer" });
            });
        }
        else {
            res.status(400).json({ errors: [{ msg: "Invalid OTP" }] });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post("/edit", ensureConsumerAuthenticated, body('name').isLength({ min: 1 }).withMessage("Name must be atleast 3 characters long"), body('mobileNo').isLength({ min: 10 }).withMessage("Mobile number must be 10 digits long"), body('city').isLength({ min: 3 }).withMessage("City must be atleast 3 charcters long"), body('district').isLength({ min: 3 }).withMessage("District must be three charcters long"),
    async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { name, mobileNo, city, district, bloodGroup } = req.body;
            const record = await Consumer.findOne({ raw: true, where: { mobileNo: mobileNo, id: { [Op.ne]: req.user.id } } });
            if (record) {
                return res.status(400).json({ errors: [{ msg: "Mobile Number already exists" }] });
            }
            await Consumer.update({
                name: name,
                mobileNo: mobileNo,
                city: city,
                district: district,
                
            }, { where: { id: req.user.id } });
            return res.status(200).json({status:"success", msg: "Record Updated Successfully" });


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }


    })

    router.get("/edit",ensureConsumerAuthenticated,async(req,res)=>{
        try{
           const record=await Consumer.findOne({raw:true,where:{id:req.user.id}});
           return res.status(200).json({status:"success",record:record});
        }catch(err){
            console.log(err);
            return res.status(500).json({msg:"Some Error Occured"});
        }
    })        
module.exports = router;
