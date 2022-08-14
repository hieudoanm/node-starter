import mongoose, { Schema } from 'mongoose';

export const TodoSchema = new Schema({
  id: { type: String, required: true, index: true, unique: true },
  todo: { type: String, required: true },
  status: { type: Boolean, required: true },
});

export const TodoModel = mongoose.model('Todo', TodoSchema);
