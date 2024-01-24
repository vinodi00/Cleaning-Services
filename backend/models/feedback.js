const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({

    name: { type: String, require },
    email: { type: String, require },
    message: { type: String, require },
   

}, {

    timestamps: true,

})

module.exports = mongoose.model('feedbacks', feedbackSchema)
