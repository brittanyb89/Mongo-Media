const { Thought, User } = require("../models");

// Set up thoughts controller
const thoughtsController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).json(err);
      });
  },

  // Create new thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) =>
        users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        )
      )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }

        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Get thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }

        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }

        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Delete thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }

        return users.findOneAndUpdate(
          { thoughts: req.params.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }

        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Add reaction to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }

        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // Remove reaction from thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;
