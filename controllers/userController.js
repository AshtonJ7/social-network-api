const { User, Thought } = require('../models');
const {ObjectId} = require('mongoose').Types;

const friendCount = async () => {
    User.aggregate().count('usersFriendsCount')
    .then((numberOfFriends) => numberOfFriends);
};

// Function that pulls the populated thoughts and friend data
const UserFriendData = async () => {
    User.aggregate([
        {$match: {_id: ObjectId}},  //matching by user id
        {$unwind: '$thoughts',},            //Deconstructs an array field from the input documents to output a document for each element.
        {$unwind: '$friends'},              //same as line 14
        {$group: {_id: ObjectId, friendData: '$friends'}}, //group data by userID and friends
        {$sort: {username: 1}},
    ])
};
  


// Get all Users

const userController = {

    async getUsers(req, res) {
        try {
          const dbUserData = await User.find()
          const userObj = { dbUserData, friendCount: await friendCount()};
      return res.json(userObj);
      
        } catch (err) {
          res.status(500).json(err);
        }
      },

// Get a user
async getSingleUser(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .lean();
  
      if (!dbUserData) {
        return res.status(404).json({ message: 'No User with that ID' });
      }
  
      res.json( { dbUserData, UserFriendData: UserFriendData(req.params.userId) } );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// Create a User
async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
  
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thought found',
        });
      }

      res.json({ message: 'Thought succesfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a User
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        {_id: req.params.userId}, //find it by id
        {$set: req.body}, //modify it
        {runValidators: true, new: true}
      );
      if (!dbUserData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Add a friend to a user
async addFriend(req, res) {
  try {
    const dbUserData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      {new:true},
    );
    if (!dbUserData) {
      return res.status(404).json({ message: 'No friend user found' });
    }
    res.json( {message: "Friend added to the friends list" });
  } catch (err) {
    res.status(500).json(err);
  }
},
// Delete a friend to a user
async deleteFriend(req, res) {
  try {
    const dbUserData = await User.findOneAndDelete(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      {new: true}
      );

    if (!dbUserData) {
      return res.status(404).json({ message: 'No user found with that ID' });
    }
    res.json( {message: "Friend was removed from the friends list" } )
  } catch (err) {
    res.status(500).json(err);
  }
}

};

module.exports = userController;