const User = require("../model/User");
const bcrypt = require("bcryptjs");

const getAllUser = async (req, res, next) => {
  let users;

  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "users are not found" });
  }

  return res.status(200).json({ users });
};

const signUp = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
      });
      await user.save();
      return res.status(200).json({ message: "signup successfull" });
    } else {
      return res.status(200).json({ message: "user already exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

// const logIn = async (req, res, next) => {
//   const { email, password } = req.body;

//   let existingUser;

//   try {
//     existingUser = await User.findOne({ email });
//   } catch (err) {
//     console.log(err);
//   }
//   if (!existingUser) {
//     return res.status(404).json({ message: "User is not found" });
//   }

//   const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

//   if (!isPasswordCorrect) {
//     return res.status(400).json({ message: "Incorrect Password!" });
//   }

//   return res.status(200).json({ user: existingUser });
// };
// const userLogIn = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email, password);
// };

const logIn = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(200).json({ message: "no user found" });
  }
  try {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      return res.status(200).json({ name: user.name, email: user.email });
    } else {
      return res.status(200).json({ message: "invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: `${error}` });
  }
};

module.exports = { getAllUser, signUp, logIn };
