const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask);

router
  .route("/:id")
  .get(taskController.getSingleTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

router.route("/:id/toggle").patch(taskController.toggleTaskCompleted);

module.exports = router;
