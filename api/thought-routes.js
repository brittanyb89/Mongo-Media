const router = require("express").Router();

// Set requirements from thought-controller.js
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  deleteReactionById,
} = require("../../controllers/thought-controller");

// Set up <GET, POST> at /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Set up <GET, PUT, DELETE> at /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

// Set up <POST> at /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// Set up <DELETE> at /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReactionById);

// Export the router
module.exports = router;
