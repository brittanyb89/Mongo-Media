const router = require("express").Router();

// Set requirements from users-controller.js
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/users-controller");

// Set up <GET, POST> at /api/users
router.route("/").get(getAllUsers).post(createUser);

// Set up <GET(single), PUT, DELETE> at /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Set up <POST, DELETE> at /api/users/:id/friends/:friendId
router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

// Export the router
module.exports = router;
