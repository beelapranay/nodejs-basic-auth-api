const router = require('express').Router();
const User = require('../models/user_model');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const validationSchema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
});

router.post('/securedlogin', async (req,res) => {

    // Validate the user
    const {error} = validationSchema.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    // Check if user already exists
    const userExists = await User.findOne({ username: req.body.username });
    if(!userExists) return res.status(400).send("You aren't an Admin.");

    // Generate the hashed password if user doesn't exist
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // If user already exists then retrieve and check with the entered password
    const password = await bcrypt.compare(req.body.password, userExists.password);
    if(!password) return res.status(400).send("Forgot your Password?")

    // Save the user to DB if all the above conditions are satisfied
    // const user = new User({
    //     username: req.body.username,
    //     password: hashedPassword
    // });

    // try{
    //     const savedUser = await user.save();
    //     res.send(savedUser);
    // }
    // catch(err){
    //     res.status(400).send("Error!");
    // }

    res.send("Logged In!")
});

module.exports = router;