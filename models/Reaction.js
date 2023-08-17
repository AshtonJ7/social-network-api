const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(

    {
      reacionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: false,
    }
  );


  const Reaction = model('reaction', reactionSchema);

  module.exports = Reaction;