const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static HTML

app.use("/api", apiRouter); // Mount the API router

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
