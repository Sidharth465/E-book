const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};
const secretKey = generateSecretKey();

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "siddharthverma465@gmail.com",
      pass: "sweb arop jtds bwfc",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "E-BooksLibrary.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// Export these controller actions
module.exports = {
  register: async (req, res) => {
    try {
      const { status, username, email, password } = req.body;
      console.log(
        "status",
        status,
        "username",
        username,
        "password",
        password,
        "email",
        email
      );
      // hashing password
      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt.hash(password, salt);
      console.log("the users password", password);
      console.log("hashing password", hash);
      console.log(" salt password", salt);
      // const isMatch = await bcrypt.compare(password, hash);
      // console.log(isMatch);

      const existingUserEmail = await User.findOne({ email });
      const existingUsername = await User.findOne({ username });
      if (existingUserEmail || existingUsername) {
        console.log("Email or UserName already registered:", email, username); // Debugging statement
        return res
          .status(400)
          .json({ message: "Email and Username already registered" });
      }

      // Create a new user
      const newUser = new User({
        role: "user",
        username,
        email,
        password: hash,
      });

      // Generate and store the verification token
      newUser.verificationToken = crypto.randomBytes(20).toString("hex");
      // Save the user to the database
      await newUser.save();
      // Debugging statement to verify data
      console.log("New User Registered:", newUser);
      // Send verification email to the user
      // Use your preferred email service or library to send the email
      sendVerificationEmail(newUser.email, newUser.verificationToken);
      res.status(201).json({
        message:
          "Registration successful. Please check your email for verification.",
      });
    } catch (error) {
      console.log("Error during registration:", error); // Debugging statement
      res.status(500).json({ message: "Registration failed" });
    }
  },
  verify: async (req, res) => {
    try {
      const token = req.params.token;
      console.log("Verification token received:", token);

      //Find the user with the given verification token
      const user = await User.findOne({ verificationToken: token });
      console.log("token Found:-", user);
      if (!user) {
        return res.status(404).json({ message: "Invalid verification token" });
      } else {
        //Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({ message: "Email verified successfully" });
        console.log("Updated User details:---", user);
      }
    } catch (error) {
      return res.status(500).json({ message: "Email Verificatioion Failed" });
    }
  },
  login: async (req, res) => {
    try {
      const { usernameoremail, password } = req.body;

      console.log("Someone is trying to login  ");
      //check if the user is exists
      const userwithUsername = await User.findOne({
        username: usernameoremail,
      });
      const userwithEmail = await User.findOne({ email: usernameoremail });
      const user = userwithUsername ? userwithUsername : userwithEmail;
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      //check if user Verified his account
      if (!user.verified) {
        return res
          .status(401)
          .json({
            message:
              "Email not verified. Please check your email for verification.",
          });
      }
      // if the password is right or not
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).json({ message: "Invalid Password" });
      }

      //generate a token
      const token = jwt.sign({ userId: user._id }, secretKey);
      //check role here
      if (user.role === "user") {
        return res.status(200).json({ token });
      }
      else if(user.role ==="admin"){
        return res.status(202).json({ token });

      }
    } catch (error) {
      return res.status(500).json({ message: "Login Failed" });
    }
  },
  getUserId: async (req, res) => {
    console.log(secretKey);
    try {
      const Token = req.headers.token;
      console.log("token", Token);
      if (!Token) {
        return res.status(404).send({ message: "Token not found" });
      }
      console.log("token from HomeScreen", Token);
      const decoded = jwt.decode(Token);
      console.log("userId-->", decoded.userId);
      // const user = await User.findOne( {verificationToken:Token} );
      if (!decoded) {
        return res.status(404).send({ message: "UserId not found" });
      }
      return res.status(200).send({ userId: decoded.userId });
    } catch (error) {
      console.error("An error occurred:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  },
};
