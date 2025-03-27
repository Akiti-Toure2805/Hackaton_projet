const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    questions: [
        {
          question: String,
          options: [String],
          category: String
        }
      ]
},
    {
    timestamps: true
    }
);

module.exports = mongoose.model('test', testSchema)