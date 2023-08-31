const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Please leave a thought',
      minlength: 1,
      maxlength: 200
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
