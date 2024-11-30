const { Router } = require('express');
const userRoutes = Router();

userRoutes.post("/signup", (req, res) => {

})

userRoutes.post("/signin", (req, res) => {

})

userRoutes.get("/purchases", (req, res) => {
  res.json({
    message: "Course purchased Successfully"
  })
})

module.exports = { userRoutes };
