const mongoose = require("mongoose");
const { mongodbUri } = require("../config/config");

mongoose.set("strictQuery", false);
async function connectDB() {
  try {
    await mongoose.connect(mongodbUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

connectDB();

const trendSchema = new mongoose.Schema(
  {
    _id: String, // Unique ID
    trend1: String,
    trend2: String,
    trend3: String,
    trend4: String,
    dateTime: Date,
    ipAddress: String,
  },
  { _id: false }
);

const Trend = mongoose.model("Trend", trendSchema);

const saveTrendData = async (data) => {
  try {
    const newTrend = new Trend(data);
    await newTrend.save();
    return true; // Indicate successful save
  } catch (err) {
    console.error("Error saving to MongoDB:", err);
    return false; // Indicate save failure
  }
};

const getTrendData = async (id) => {
  try {
    return await Trend.findById(id).lean();
  } catch (err) {
    console.error("Error fetching trend data from MongoDB:", err);
    return null; // Indicate fetch failure
  }
};

module.exports = {
  saveTrendData,
  getTrendData,
};
