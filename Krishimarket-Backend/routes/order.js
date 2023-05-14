const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { ensureConsumerAuthenticated } = require("../middleware/auth");
const Order = require('../models/Order');
const Consumer = require('../models/Consumer');
const Farmer = require('../models/Farmer');
const Inventory = require('../models/Inventory');
const { Sequelize } = require("sequelize");

// FOR PLACING AN ORDER
router.post('/', ensureConsumerAuthenticated, body("unit").isInt({ min: 1 }), body("invId").notEmpty(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const inv = await Inventory.findOne({ raw: true, where: { id: req.body.invId } });
        if (inv.quantity < req.body.quantity) {
            return res.status(200).json({ status: "fail", msg: "Not Enough Quantity" });
        }
        const total = (inv.pricePerUnit * req.body.quantity);
        const consumer = await Consumer.findOne({ raw: true, where: { id: req.user.id } });
        if (consumer.money < total) {
            return res.status(200).json({ status: "fail", msg: "Not Enough Money" });
        }
        const order = await Order.create({
            quantity: req.body.quantity,
            invId: req.body.invId,
            total: total,
            consumerId: req.user.id,
        });
        await order.save();
        await Consumer.update({ money: Sequelize.literal(`money-${total}`) }, { where: { id: req.user.id } });
        await Farmer.update({ money: Sequelize.literal(`money+${total}`) }, { where: { id: inv.farmerId } });
        await Order.update({ status: "paid" }, { where: { id: order.id } });
        await Inventory.update({ quantity: Sequelize.literal(`quantity-${req.body.quantity}`) }, { where: { id: req.body.invId } });
        return res.status(200).json({ status: "success", msg: "Order Placed Successfully" });


    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Some Error Occured" });
    }
})

router.get("/", ensureConsumerAuthenticated, async (req, res) => {
    try {

        const orders = await Order.findAll({ nest: true, raw: true, include: ["Inventory", "Consumer"], where: { consumerId: req.user.id } });
        orders.forEach((item, index) => {
            delete item.Consumer.mobileNo;
        })
        return res.status(200).json({ status: "success", orders: orders });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Some Error Occured" });
    }
})
module.exports = router;