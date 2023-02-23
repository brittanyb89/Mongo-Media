const router = require("express").Router();
const apiRoutes = require("./api");

// Set up /api routes
router.use("/api", apiRoutes);

// Set up /home route
router.use((req, res) => res.send("Wrong route!"));

// Export the router
module.exports = router;
