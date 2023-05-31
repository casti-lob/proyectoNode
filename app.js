const express = require('express');
const app = express();
require('dotenv').config();

//Conexion MongoDb
const { dbConnection } = require('./database/config.js');
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()

const song = require('./routers/song.js')
const user = require('./routers/user.js')

//middleware
app.use(express.json())

app.use('/songs',song)
app.use('/users',user)
app.use('/users/login',user)
app.listen(process.env.PORT)

console.log(`Server listening on port${process.env.PORT}`)