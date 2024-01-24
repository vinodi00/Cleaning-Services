const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback")


router.post("/post/", async (req, res) => {

    const { name, email, message} = req.body



    try {


        const newFeedback = new Feedback({ name, email, message })
        newFeedback.save()
        res.send('Feedback send Successfully')


    } catch (error) {

        return res.status(400).json({ message: error });
    }
});

// feedback management
router.get("/getallfeedbacks", async (req, res) => {


    try {

        const Allfeedbacks = await Feedback.find()//find data from Feedback model
        res.send(Allfeedbacks)

    } catch (error) {
        return res.status(400).json({ message: error });
    }
});


//Delete feedback
router.delete("/delete/feedback/:id", async (req, res) => {

    let userId = req.params.id;

    try {
        await Feedback.findByIdAndDelete(userId)

        res.send('Feedback Deleted Successfully')
    }

    catch (error) {


        return res.status(400).json({ message: error });
    }
});


module.exports = router