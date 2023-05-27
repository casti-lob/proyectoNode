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

//middleware
app.use(express.json())

app.use('/songs',song)


app.listen(process.env.PORT)

console.log(`Server listening on port${process.env.PORT}`)