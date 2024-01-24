const express = require("express");
const router =express.Router();
const Customer =require("../models/Customer");


router.post("/login/", async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await user.find({ email, password })

        if (user.length > 0) {

            const currentUser = {
                email: user[0].email,
                password: user[0].password,
                _id: user[0]._id,
            }
            res.send(currentUser);

        }
        else {

            return res.status(400).json({ message: 'User Login Failed' });

        }

    } catch (error) {

        return res.status(400).json({ message: 'Something went wrong' });
    }
})


router.post("/add/", async (req, res) =>{
    const { name, email, password, repassword } = req.body;
    try {
        const customerExist = await Customer.findOne({ email });
    
        if (customerExist) {
          return res.status(400).json({ message: "Customer already exists" });
        } else {
          const newCustomer = new Customer({
            Name: name,
            email,
            password,
            repassword
          });
    
          await newCustomer.save();
          res.status(201).json({ message: "New customer created" });
        }
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    });
    
    
router.route("/").get (()=>{
    //body
    Customer.find().then((customer)=>{
        res.json(customer)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async(req,res)=>{
   let userId =req.params.id;
   const {name,email,phone,password}=req.body;

   const updateCustomer={ 
    name,
    email,
    phone,
    password
}

   const update = await Customer.findByAndUpdate(userId,updateCustomer)
   .then(()=>{
    res.status(200).send({status:"user updated",user:update})
   }).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"error with updating data"});
    })
   })

router.route("/delete/:id").delete(async(req,res)=>{
    let userId =req.params.id;

   await Customer.findByAndDelete(userId)
   .then(()=>{
    res.status(200).send({status:"user deleted"})
   }).catch((err)=>{
    console.log(err,message);
    res.status(500).send({status:"error with deleting data",error:err.message});
    })
})
router.route("/get/:id").get(async(req,res)=>{
    let userId=req.params.id;
    const user=await Customer.findById(userId)
    .then(()=>{
        res.status(200).send({satatus:"user fetched",user:user})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"error with get user",error:err.message});
    })
})

router.get("/getcurrentuser/:id", async (req, res) => {

    let userId = req.params.id;
    try {

        const currentusers = await User.findById(userId)
        res.send(currentusers)

    } catch (error) {
        return res.status(400).json({ message: error });
    }

})

router.get("/getallusers", async (req, res) => {


    try {

        const users = await User.find()
        res.send(users)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


router.put("/update/password/:id", async (req, res) => {

    let userId = req.params.id;
    const { password } = req.body;

    const updateUserPassword = {

        password,

    }

    try {

        await User.findByIdAndUpdate(userId, updateUserPassword)
        res.send('User Password Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


router.put("/update/name/:id", async (req, res) => {

    let userId = req.params.id;
    const { name } = req.body;

    const updateUserName = {

        name,

    }

    try {

        await User.findByIdAndUpdate(userId, updateUserName)
        res.send('User Name Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



router.put("/update/email/:id", async (req, res) => {

    let userId = req.params.id;
    const { email } = req.body;

    const updateUserEmail = {

        email,

    }

    try {

        await User.findByIdAndUpdate(userId, updateUserEmail)
        res.send('User Email Updated Successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports=router;


