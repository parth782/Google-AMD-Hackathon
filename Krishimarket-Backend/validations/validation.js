const Farmer = require('../models/Farmer');
const Consumer = require('../models/Consumer');
module.exports = {
    uniqueCheckMobileFarmer: async (value) => {
        const user = await Farmer.findOne({raw: true, where: { mobileNo: value }});
        if (user) {
            throw new Error("Mobile No already exists");
        }
    },
    uniqueCheckMobileConsumer: async (value) => {
        const user = await Consumer.findOne({raw: true, where: { mobileNo: value }});
        if (user) {
            throw new Error("Mobile No already exists");
        }
    }

}