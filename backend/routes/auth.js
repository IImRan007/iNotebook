const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetchUser = require("../middleware/fetchUser");

// Route - 1: Create a User using: POST "/api/auth/createuser" No login required

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isString().isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }
      // Using bcryptjs
      const salt = await bcrypt.genSalt(10);
      securePasword = await bcrypt.hash(req.body.password, salt);
      // Craete a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePasword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;

      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// Route - 2: Authenticate a User using: POST "/api/auth/login" No login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(payload, process.env.JWT_SECRET);
      success = true;

      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route - 3: Get loggedin User details using: POST "/api/auth/getuser" login required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
