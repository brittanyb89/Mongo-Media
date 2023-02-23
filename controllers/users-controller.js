const { users } = require("../models");

// Set up thoughts controller
const usersController = {
  // Get all users
  getAllUsers(req, res) {
    users
      .find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json(err);
      });
  },

  // Get user by id
  getUserById({ params }, res) {
    users
      .findOne({ _id: params.userId })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }

        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json(err);
      });
  },

  // Create new user
  createUser({ body }, res) {
    users
      .create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // Update user by id
  updateUser({ params, body }, res) {
    users
      .findOneAndUpdate({ _id: params.userId }, body, {
        new: true,
        runValidators: true,
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }

        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete user by id
  deleteUser({ params }, res) {
    users
      .findOneAndDelete({ _id: params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }

        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Add friend to user
  addFriend({ params }, res) {
    users
      .findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }

        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // Delete friend from user
  deleteFriend({ params }, res) {
    users
      .findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = usersController;
