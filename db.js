const { Schema, model } = require('mongoose');
mongoose.connect(MONGO_URL);

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String
});

export const userModel = model("User", userSchema);

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String
})

export const adminModel = model("Admin", adminSchema);

const courseSchema = new Schema({
  title: String,
  description: String,
  price: number,
  imageURL: String,
  creatorId: ObjectId
})

export const courseModel = model("Course", courseSchema);

const purchaseSchema = new Schema({
  userId: ObjectId,
  creatorId: ObjectId
})

export const purchaseModel = model("Purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel
};
