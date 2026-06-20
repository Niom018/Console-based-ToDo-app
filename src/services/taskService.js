const pool = require('../config/db');
const { isValidPriority, isValidStatus, isValidDate } = require('../utils/validators');

async function addTask(userId, title, description, dueDate, priority) {
  if (!title || title.trim() === '') {
    console.log('Task title cannot be empty.');
    return false;
  }
  if (!isValidPriority(priority)) {
    console.log('Priority must be Low, Medium, or High.');
    return false;
  }
  if (!isValidDate(dueDate)) {
    console.log('Invalid date format. Use YYYY-MM-DD.');
    return false;
  }

  await pool.query(
    'INSERT INTO tasks (userId, title, description, dueDate, priority, status) VALUES (?, ?, ?, ?, ?, ?)',
    [userId, title.trim(), description.trim(), dueDate, priority, 'Pending']
  );
  console.log('Task added successfully!');
  return true;
}

async function viewTasks(userId) {
  const [tasks] = await pool.query(
    'SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC',
    [userId]
  );

  if (tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }

  console.log('\nYour Tasks:\n');
  tasks.forEach(task => {
    console.log(`ID: ${task.id}`);
    console.log(`Title: ${task.title}`);
    console.log(`Due Date: ${task.dueDate ? task.dueDate.toISOString().split('T')[0] : 'N/A'}`);
    console.log(`Priority: ${task.priority}`);
    console.log(`Status: ${task.status}`);
    console.log('----------------------------');
  });
}

async function editTask(userId, taskId, title, description, dueDate, priority) {
  // Validate task ID
  if (!taskId || isNaN(taskId)) {
    console.log('Invalid task ID.');
    return false;
  }

  // Check task exists and belongs to user
  const [tasks] = await pool.query(
    'SELECT * FROM tasks WHERE id = ? AND userId = ?',
    [taskId, userId]
  );
  if (tasks.length === 0) {
    console.log('Task not found.');
    return false;
  }

  const existing = tasks[0];

  // Use existing values if new ones are empty
  const newTitle = title.trim() || existing.title;
  const newDesc = description.trim() || existing.description;
  const newDueDate = dueDate.trim() || existing.dueDate.toISOString().split('T')[0];
  const newPriority = priority.trim() || existing.priority;

  if (!isValidPriority(newPriority)) {
    console.log('Invalid priority.');
    return false;
  }
  if (!isValidDate(newDueDate)) {
    console.log('Invalid date format.');
    return false;
  }

  await pool.query(
    'UPDATE tasks SET title = ?, description = ?, dueDate = ?, priority = ? WHERE id = ? AND userId = ?',
    [newTitle, newDesc, newDueDate, newPriority, taskId, userId]
  );
  console.log('Task updated successfully!');
  return true;
}

async function deleteTask(userId, taskId) {
  if (!taskId || isNaN(taskId)) {
    console.log('Invalid task ID.');
    return false;
  }

  const [tasks] = await pool.query(
    'SELECT * FROM tasks WHERE id = ? AND userId = ?',
    [taskId, userId]
  );
  if (tasks.length === 0) {
    console.log('Task not found.');
    return false;
  }

  await pool.query('DELETE FROM tasks WHERE id = ? AND userId = ?', [taskId, userId]);
  console.log('Task deleted successfully!');
  return true;
}

async function searchTasks(userId, keyword) {
  const [tasks] = await pool.query(
    'SELECT * FROM tasks WHERE userId = ? AND (title LIKE ? OR description LIKE ?)',
    [userId, `%${keyword}%`, `%${keyword}%`]
  );

  if (tasks.length === 0) {
    console.log('No matching tasks found.');
    return;
  }

  console.log('\nSearch Result:\n');
  tasks.forEach(task => {
    console.log(`ID: ${task.id}`);
    console.log(`Title: ${task.title}`);
    console.log(`Due Date: ${task.dueDate ? task.dueDate.toISOString().split('T')[0] : 'N/A'}`);
    console.log(`Priority: ${task.priority}`);
    console.log(`Status: ${task.status}`);
    console.log('----------------------------');
  });
}

module.exports = { addTask, viewTasks, editTask, deleteTask, searchTasks };