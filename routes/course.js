const { Router } = require('express');
const courseRoute = Router();

courseRoute.post("/purchase", (req, res) => {

})

courseRoute.get("/preview", (req, res) => {
  res.json({
    message: "Course preview endpoint"
  })
})

module.exports = { courseRoute };
