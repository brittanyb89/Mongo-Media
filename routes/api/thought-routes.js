const router = require("express").Router();

// Set requirements from thought-controller.js
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughts-controller");

// Set up <GET, POST> at /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Set up <GET, PUT, DELETE> at /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Set up <POST> at /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// Set up <DELETE> at /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

// Export the router
module.exports = router;
