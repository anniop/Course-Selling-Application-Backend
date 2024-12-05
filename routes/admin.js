const { Router } = require('express');
const adminRoutes = Router();
const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_PASSWORD } = require("../config.js")
const { jwt } = require("jsonwebtoken");
// const bcrypt = require('bcrypt');
const zod = require('zod');
const { adminMiddleware } = require('../middlewares/adminMiddleware.js')


const adminSignupSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod.string().min(6, { message: "Password must be at least 6 characters" }),
  firstName: zod.string(),
  lastName: zod.string(),
});

adminRoutes.post("/signup", async (req, res) => {
  try {
    const parseResult = adminSignupSchema.safeParse(req.body);
    console.log("Validation Result:", parseResult);

    if (!parseResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parseResult.error.errors,
      });
    }

    const { email, password, firstName, lastName } = parseResult.data;

    // const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.create({
      email,
      password,
      firstName,
      lastName,
    });

    res.status(201).json({
      message: "Signup successful!",
    });
  } catch (error) {
    console.error("Error during signup:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already registered!",
      });
    }

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

adminRoutes.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({
    email: email,
    password: password
  });
  if (admin) {
    const token = jwt.sign({
      id: admin._id
    }, JWT_ADMIN_PASSWORD)
    res.json({
      token
    })
  } else {
    res.status(403).json({
      message: "Incorrect Credentials"
    })
  }

})

adminRoutes.post("/course", adminMiddleware, async (req, res) => {
  const { title, description, price, imageurl, creatorId } = req.body;

  const course = await adminModel.create({
    title: title,
    description: description,
    price: price,
    imageurl: imageurl,
    creatorId: adminId
  })

  res.json({
    message: "Course Created",
    courseId: course._id
  })

})

adminRoutes.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId
  const { title, description, price, imageurl, courseId } = req.body;

  const course = await courseModel.updateOne({
    _id: courseId,
    creatorId: adminId
  }, {
    title: title,
    description: description,
    imageurl: imageurl,
    price: price
  })
  res.json({
    message: "Course Updated",
    courseId: course._id
  })
})


adminRoutes.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const courses = await courseModel.find({
    creatorId: adminId
  });
  res.json({
    message: "Course Updated",
    courses: courses
  })
})


module.exports = { adminRoutes: adminRoutes };
