const { Router } = require('express');
const courseRoute = Router();
const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require('../middlewares/userMiddleware')

courseRoute.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  if (!courseId) {
    res.status(400).json({
      message: "Please Provide Coures Id"
    })
  }

  const existingPurchase = await purchaseModel.findOne({
    courseId: courseId,
    userId: userId
  })
  if (existingPurchase) {
    res.status(400).json({
      message: "You bought this course already"
    })
  }
  await purchaseModel.create({
    courseId: courseId,
    userId: userId
  })
  res.status(201).json({
    message: "Successfully Bought the Course"
  })
})

courseRoute.get("/preview", async (req, res) => {
  const courses = await courseModel.find({});
  res.status(200).json({
    courses: courses
  })
})

module.exports = { courseRoute };
