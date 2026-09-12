const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: `Get tasks error ... ${err.message}` });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: `Create task error ... ${err.message}` });
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    const singleTask = await Task.findById(req.params.id);
    if (!singleTask) {
      return res.status(404).json({ message: "Task not Found." });
    }
    res.status(200).json(singleTask);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Get single task error ... ${err.message}` });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatetask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatetask)
      return res.status(404).json({ message: "Task not Found." });

    res.status(200).json(updatetask);
  } catch (err) {
    res
      .status(500)
      .json({ message: `Get Update task error ... ${err.message}` });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);

    if (!deleteTask)
      return res.status(404).json({ message: "Task not Found." });

    res.status(204).json();
  } catch (err) {
    res
      .status(500)
      .json({ message: `Get Delete task error ... ${err.message}` });
  }
};

exports.toggleTaskCompleted = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not Found." });

    task.completed = !task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({
      message: `Get toggle task completion  error ... ${err.message}`,
    });
  }
};
