import mongoose, { Schema } from 'mongoose';

export type TodoType = {
  id: string;
  todo: string;
  status: boolean;
};

export const TodoSchema = new Schema({
  id: { type: String, unique: true, required: true },
  todo: { type: String, required: true },
  status: { type: Boolean, required: true },
});

export const TodoModel = mongoose.model('Todo', TodoSchema);
