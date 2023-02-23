const { connect, connection } = require("mongoose");

// Connect to the Mongo DB
const connectionString =
  process.env.MONGODB_URI || "mongod://localhost/mongo-media";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
