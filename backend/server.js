const express =  require("express");
const bodyParser =  require("body-parser");
const cors =  require("cors");
require("dotenv").config();

const Customer = require('./models/Customer')

const app = express();



const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
const mongoose = require("mongoose");

var MONGODB_URL = 'mongodb+srv://vinodi:12345@customermanage.utv508z.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URL , { useUnifiedTopology: true, useNewUrlParser: true })

var db = mongoose.connection

db.on('connected', () => {
    console.log(`Mongodb Connection Success!`);
})

db.on('error', () => {
    console.log(`Mongodb Connection failed!`);
})
const customerRouter =require("./routes/customerRoute.js");
app.use("/api/customer",customerRouter);

app.get("/", (req, res) => {

    res.send("Server Working!");

});

const feedbackRoute = require('./routes/feedbackRoute')

app.use('/api/feedback',feedbackRoute)


app.listen(PORT,()=>{
    console.log(`server is up running on port number: ${PORT}`)
})

module.exports = mongoose