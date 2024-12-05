const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const { userRoutes } = require("./routes/user");
const { courseRoute } = require("./routes/course");
const { adminRoutes } = require("./routes/admin")
const app = express();
app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/admin", adminRoutes);

async function main() {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(3000);
  console.log("Listining on port 3000")
}
main();
