import { Schema, model, models } from 'mongoose';
import { handleSaveErrors } from '../utils/mongo/handleSaveErrors';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      minlength: 4,
    },

    activationLink: {
      type: String,
      default: null,
    },

    isActivated: {
      type: Boolean,
      default: false,
    },

    firstName: {
      type: String,
    },

    accessToken: {
      type: String,
      default: null,
    },

    refreshToken: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ['admin', 'manager', 'dealer', 'installer', 'finalBuyer'],
      default: 'finalBuyer',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveErrors);

export const User = models.users || model('users', userSchema);