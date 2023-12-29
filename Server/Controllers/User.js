const User = require("../Modal/User/UserSchema");
const bcrypt = require("bcrypt"); // for hashing the password into hash code
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// this function will handle all the registration of the user and also hash the password into db
const register = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  // console.log("the email is", email);
  try {
    // need to validate the data coming in the body
    if (!name) {
      return res.status(400).send("Name is Required");
    }
    if (!email) {
      return res.status(400).send("Email is Required");
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send(
          "Password must be at least 6 char with one letter and special character"
        );
    }
    if (password !== cpassword) {
      return res.status(400).send("Password and confirm Password must be same");
    }
    // let me check if user if already present in db
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send("Email is already in use");
    }
    // after here i am using hashing the password save the hashed password to db
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword, // this is the hashed password
    });

    await newUser.save();

    res.status(200).send("User Registered Succefully");
    // we need to send opt to given email
  } catch (error) {
    // Handle errors
    // console.error(error);
    res.status(400).send(error.message);
  }
};
// this function will responsible for the sign in using jwt
const login = async (req, res) => {
  // then sent a jwt token to user
  try {
    // need to verufy the email address and password
    const { email, password } = req.body;
    // first need to check the email;
    const UserEmail = await User.findOne({ email: email });

    if (!UserEmail) {
      return res.status(400).send("User not find Invalid Credentials");
    }
    // if find then go for password check using bcrypt
    const ConfirmPassword = await bcrypt.compare(password, UserEmail.password);

    if (!ConfirmPassword) {
      return res.status(400).send("Invalid Credentials");
    }

    // then need to provide the jwt token
    let token = jwt.sign({ _id: UserEmail._id }, process.env.JWTSECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      User: {
        _id: UserEmail._id,
        name: UserEmail.name,
        email: UserEmail.email,
        token: token,
        createdAt: UserEmail.createdAt,
        updatedAt: UserEmail.updatedAt,
      },
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = { register, login };
