require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.URI;

async function connectToMongo() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✔ Connected to database ...');
    } catch (error) {
        console.error('❌ Couldn\'t connect to the database!', error);
    }
}

module.exports = {mongoose, connectToMongo}