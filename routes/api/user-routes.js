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
router.route("/:Id").get(getUserById).put(updateUser).delete(deleteUser);

// Set up <POST, DELETE> at /api/users/:Id/friends/:friendId
router.route("/:Id/friends/:friendId").post(addFriend).delete(deleteFriend);

// Export the router
module.exports = router;
