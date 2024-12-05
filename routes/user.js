const { Router } = require('express');
const userRoutes = Router();
const { userModel, purchaseModel, courseModel } = require("../db")
const { z } = require("zod");
// const bcrypt = require("bcrypt");
const { JWT_USER_PASSWORD } = require('./course.js')
const jwt = require("jsonwebtoken");
const userMiddleware = require('../middlewares/userMiddleware.js');

const userSignupSchema = z.object({
  email: z.string().email({ message: "Enter Valid Mail Address" }),
  password: z.string().min(8, { message: "The Password is too short" }),
  firstName: z.string().min(1),
  lastName: z.string().min(1)
})

userRoutes.post("/signup", async (req, res) => {

  try {
    const parseResult = userSignupSchema.safeParse(req.body);
    if (!parseResult) {
      res.status(404).json({
        message: "Invalid Input"
      });
    }
    const { email, password, firstName, lastName } = parseResult.data;
    // const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      email,
      password,
      firstName,
      lastName
    })
    res.status(201).json({
      message: "Signup Successful"
    })
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        message: "Email already registered!",
      });
    }

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }

})

userRoutes.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
    password: password
  })
  if (user) {
    const token = jwt.sign({
      id: user._id
    }, JWT_USER_PASSWORD)
    res.json({
      token: token
    })
  } else {
    res.status(403).json({
      message: "Invalid Credentials"
    })
  }
})

userRoutes.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });
  let purchasedCoureseIds = [];
  for (let i = 0; i < purchases.length; i++) {
    purchasedCoureseIds.push(purchases[i].courseId);
  }
  const courseData = await courseModel.find({
    _id: { $in: purchasedCoureseIds }
  })
  res.json({
    purchases,
    courseData
  })
})

module.exports = { userRoutes };
