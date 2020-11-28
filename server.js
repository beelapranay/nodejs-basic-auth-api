const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/auth_route')

dotenv.config();
app.use(express.json());


app.get('/', (req,res) =>{
    res.send("Hello!");
});

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useCreateIndex: true },
    () => {
        console.log("Connected to Database!");
    });

app.use(authRoute);


app.listen(process.env.PORT || 3000, () => {
    console.log("Server up and running!");
});