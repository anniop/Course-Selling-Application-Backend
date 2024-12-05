const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const ObjectId = mongoose.Types.ObjectId;

// User Schema
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String
});
const userModel = model("User", userSchema);

// Admin Schema
const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String
});
const adminModel = model("Admin", adminSchema);

// Course Schema
const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorId: ObjectId
});
const courseModel = model("Course", courseSchema);

// Purchase Schema
const purchaseSchema = new Schema({
  userId: ObjectId,
  creatorId: ObjectId
});
const purchaseModel = model("Purchase", purchaseSchema);

// Exporting Models
module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel
};
;
