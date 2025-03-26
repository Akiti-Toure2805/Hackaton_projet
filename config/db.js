const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://Hackaton_projet:HP12345@cluster0.wudzl9e.mongodb.net/?retryWrites=true&w=majority";

// Vérifier si l'URI est bien définie
console.log("MONGO_URI:", MONGO_URI);


const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI)
            .then(() => {
                console.log('MongoDB connecté');
            })
            .catch((error) => {
                console.error('Connection failed', error);
            });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;
