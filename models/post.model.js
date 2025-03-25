const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        nom: {
            type : String,
            required: true,
        },
        prenom: {
            type : String,
            required: true,
        },
        mail: {
            type : String,
            required: true,
        },
        contact: {
            type : String,
            required: true,
        },
        serie: {
            type : String,
            required: true,
        },
        ceatedAt: {
            type : Date,
            default: Date.now,
        }
    },

    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('users', postSchema)