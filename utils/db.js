require('dotenv').config();
const mongoose = require('mongoose')


const connectDb = async()=>{
   try {
     await mongoose.connect (process.env.MONGODB_URI);
         console.log("Connection SuccessFul 💯");
   } catch (error) {
    console.log('Error connecting DB',error);
   }
       
}

module.exports = connectDb