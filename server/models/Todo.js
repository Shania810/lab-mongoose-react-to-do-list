import { model, Schema } from "mongoose";

const newTask = Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    completed: { type: Boolean, default: false },
    user: {type: ObjectId}
  },
  { timestamps: true }
);
const Task = model("Task", newTask);
export default Task;
