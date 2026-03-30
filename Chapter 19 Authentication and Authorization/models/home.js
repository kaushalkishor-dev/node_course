const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const favourite = require("./favourite");

const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
});

// pre-save hook to handle both create and update operations
homeSchema.pre("findOneAndDelete", async function () {
  console.log("Came to prehook while deleting a home");
  const homeId = this.getQuery()._id;
  await favourite
    .deleteMany({ houseId: homeId })
});

module.exports = mongoose.model("Home", homeSchema);
