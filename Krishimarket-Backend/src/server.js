require('dotenv').config()
const app = require('./app')
const knex = require('knex')

const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
})

app.set('db', db)
const PORT=process.env.PORT||5000
app.get("/",function(req,res){
    res.status(200).send({
		uptime: process.uptime(),
		message: 'Welcome to Farmer Bazaar',
		timestamp: Date.now(),

	});
    return;
})
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    return;
})
