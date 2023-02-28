const router = require("express").Router();

const thoughtRoutes = require("./thought-routes");
const userRoutes = require("./user-routes");

// Add '/users' and '/thoughts' to the prefix of their routes
router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

// Export the router
module.exports = router;
