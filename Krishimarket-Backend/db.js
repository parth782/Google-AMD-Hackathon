const { Sequelize } = require("sequelize");

module.exports = {
    conn: new Sequelize(process.env.DB_URL,{
        dialect: 'postgres',
        logging:false
      })
}