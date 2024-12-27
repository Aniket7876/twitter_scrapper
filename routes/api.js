const express = require("express");
const { scrapeTwitterTrends } = require("../scrapers/twitter");
const { saveTrendData, getTrendData } = require("../db/mongo");

const router = express.Router();

router.post("/scrape", async (req, res) => {
  try {
    const trendData = await scrapeTwitterTrends();
    if (trendData) {
      const saved = await saveTrendData(trendData);
      if (saved) {
        res.status(200).json({ success: true, trendData });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Failed to save data to MongoDB" });
      }
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch data from Twitter" });
    }
  } catch (error) {
    console.error("Error during scrape:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to scrape trends",
    });
  }
});

router.get("/trends/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const trendData = await getTrendData(id);

    if (trendData) {
      res.status(200).json({ success: true, trendData });
    } else {
      res.status(404).json({ success: false, message: "Trend Data not found" });
    }
  } catch (err) {
    console.error("Error getting data from MongoDB:", err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching from MongoDB" });
  }
});

module.exports = router;
