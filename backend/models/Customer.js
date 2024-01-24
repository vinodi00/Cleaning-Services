const mongoose = require("mongoose");

const Schema =mongoose.Schema;
const customerSchema = mongoose.Schema({
  Name: 
  { 
    type: String, required: true 
},
  email: { 
    type: String, required: true 
},
  phone: { 
    type: String
},
  password: { 
    type: String, required: true 
}
  
})

const Customer =mongoose.model("Customer",customerSchema);
 module.exports=Customer;