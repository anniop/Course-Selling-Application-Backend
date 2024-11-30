const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const { userRoutes } = require("./routes/user");
const { courseRoute } = require("./routes/course");
const { adminRoutes } = require("./routes/admin")
const app = express();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/admin", adminRoutes);

app.listen(3000, () => {
  console.log("Backend Started at port 3000");
})
