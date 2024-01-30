const User = require("../model/User.js");
const bcrypt = require("bcryptjs");


const signUp = async (req, res, next) => {
    console.log(req.body);
    // Extracting fields from the request body
    const { firstName, lastName, email, password } = req.body;

    try {
        // Checking if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // If a user with the same email exists, return a 400 status with a message
            return res.status(400).json({ message: "User already exists" });
        }
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('hashed password: ', hashedPassword);

        // Creating a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            blogs: []
        });

        // Saving the new user to the database
        await newUser.save();

        // Log the response
        console.log("User created successfully:", newUser);

        // Sending a success response
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        // Handling any errors that occur during the signup process
        console.error("Error signing up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};






const getAllUser = async(req,res,next) =>{
    let users;

    try{
        users = await User.find();
    }
    catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({ message : "users are not found"})
    }

    return res.status(200).json({users});
}



const singIn = async(req,res,next) => {
    const {email , password} = req.body;
    
    let existingUser;

    try{
     existingUser = await User.findOne({email})
    }catch(e){
     console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message : "User is not found"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Incorrect Password!"});
    }

    return res.status(200).json({user: existingUser});
}

module.exports = { getAllUser, signUp , singIn};