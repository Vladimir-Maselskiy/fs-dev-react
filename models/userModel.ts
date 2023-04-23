import { Schema, model, models } from 'mongoose';
import { handleSaveErrors } from '../utils/mongo/handleSaveErrors';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      // match: [emailRegexp, "Email is invalid"],
      unique: true,
    },
    // password: {
    // 	type: String,
    // 	minlength: 6,
    // 	required: [true, "Password is required"],
    // },
    firstName: {
      type: String,
    },

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveErrors);

export const User = models.users || model('users', userSchema);
