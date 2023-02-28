const mongoose = require("mongoose");
const express = require("express");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// in the lookout for routes
app.use(require("./routes"));

// Connect mongoose to our database
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongo-media", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Use this to log mongo queries being executed
// mongoose.set("debug", true);
db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
});
