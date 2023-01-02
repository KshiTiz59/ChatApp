const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.ikiqr3w.mongodb.net/ChatApp?retryWrites=true&w=majority`, ()=>{
    console.log('connect to mongodb');
})
