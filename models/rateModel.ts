import { Schema, model, models } from 'mongoose';
import { handleSaveErrors } from '../utils/mongo/handleSaveErrors';

const rateSchema = new Schema(
  {
    euroRate: {
      type: String,
      required: [true, 'Rate is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

rateSchema.post('save', handleSaveErrors);

export const Rate = models.rates || model('rates', rateSchema);
