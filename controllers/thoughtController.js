const { User, Thought, } = require('../models');

const thoughtController = {
 
 // Get all thoughts
 async getThoughts(req, res) {
  try {
    const dbThoughtData = await Thought.find()
    .sort({ createdAt: -1 });

    res.json(dbThoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
},
// Get a thought
async getSingleThought(req, res) {
  try {
    const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId })
      

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(dbThoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
// Create a thought
async createThought(req, res) {
  try {
    const dbThoughtData = await Thought.create(req.body);

    const dbUserData = await User.findOneAndUpdate(
      {users: req.params.userId}, 
      {$push: {thoughts: dbThoughtData._Id}}, 
      {new: true}
    );
    if (!dbUserData) {
      return res.status(404)
      .json({ message: "Thought created but no user with this ID"});
    }

    res.json({ message: "Thought succesfully created "});
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},
// Delete a thought
async deleteThought(req, res) {
  try {
    const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    const dbUserData = User.findOneAndUpdate(  //find user associated with this Thought
    {thoughts: req.params.thoughtId }, //get info from object parameter
    {$pull: {thoughts: req.params.thoughtId}}, //removes user from an array of users
    {new: true} //Returns the document after update was applied.
);
if(!dbUserData) {
  return res.status(404).json({ message: "Thought created but no User with this ID"});
}
    res.json({ message: 'Thought succesfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},
// Update a thought
async updateThought(req, res) {
  try {
    const dbThoughtData = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId}, //find it by id
      {$set: req.body}, //modify it
      {runValidators: true, new: true} //run vlaidaotr
    );

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(dbThoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
},
 
//Add a rection to a thought

async addReaction (req, res) {
  try {
    const dbThoughtData = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$addToset: { reactions: req.body} },
      {runValidators: true, new: true} //run vlaidaotr
    );

    if (!dbThoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(dbThoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

async removeReaction(req, res) {
  try {
    const dbThoughtData = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$pull: { reactions: { reactionId: req.params.reactionId} } },
      {runValidators: true, new: true} //run vlaidaotr
    );

    if (!dbThoughtData) {
      return res.status(404).json( { message: 'No thought with this id'});
  }
  res.json(dbThoughtData);
} catch (err) {
  console.log(err); {
    res.status(500).json(err);
  }
}
}
}

 module.exports = thoughtController;