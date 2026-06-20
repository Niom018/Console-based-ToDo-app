const readline = require('readline-sync');
const { addTask, viewTasks, editTask, deleteTask, searchTasks } = require('../services/taskService');

async function taskMenu(user) {
  let running = true;

  while (running) {
    console.log('\n============================');
    console.log('        Todo Menu');
    console.log('============================');
    console.log('1. Add Task');
    console.log('2. View All Tasks');
    console.log('3. Edit Task');
    console.log('4. Delete Task');
    console.log('5. Search Tasks');
    console.log('6. Logout');
    console.log('============================');

    const choice = readline.question('Enter your choice: ');

    switch (choice) {
      case '1':
        console.log('\n--- Add Task ---');
        const title = readline.question('Enter task title: ');
        const description = readline.question('Enter task description: ');
        const dueDate = readline.question('Enter due date (YYYY-MM-DD): ');
        const priority = readline.question('Enter priority (Low/Medium/High): ');
        await addTask(user.id, title, description, dueDate, priority);
        break;

      case '2':
        console.log('\n--- View All Tasks ---');
        await viewTasks(user.id);
        break;

      case '3':
        console.log('\n--- Edit Task ---');
        const editId = readline.question('Enter task ID to edit: ');
        
        // Show current task first
        const pool = require('../config/db');
        const [tasks] = await pool.query(
          'SELECT * FROM tasks WHERE id = ? AND userId = ?',
          [editId, user.id]
        );

        if (tasks.length === 0) {
          console.log('Task not found.');
          break;
        }

        const task = tasks[0];
        console.log(`\nCurrent Title: ${task.title}`);
        const newTitle = readline.question('Enter new title (press Enter to keep current): ');

        console.log(`Current Description: ${task.description}`);
        const newDesc = readline.question('Enter new description (press Enter to keep current): ');

        console.log(`Current Due Date: ${task.dueDate.toISOString().split('T')[0]}`);
        const newDate = readline.question('Enter new due date (press Enter to keep current): ');

        console.log(`Current Priority: ${task.priority}`);
        const newPriority = readline.question('Enter new priority (press Enter to keep current): ');

        await editTask(user.id, editId, newTitle, newDesc, newDate, newPriority);
        break;

      case '4':
        console.log('\n--- Delete Task ---');
        const deleteId = readline.question('Enter task ID to delete: ');
        const confirm = readline.question('Are you sure you want to delete this task? yes/no: ');
        if (confirm.toLowerCase() === 'yes') {
          await deleteTask(user.id, deleteId);
        } else {
          console.log('Delete cancelled.');
        }
        break;

      case '5':
        console.log('\n--- Search Tasks ---');
        const keyword = readline.question('Enter search keyword: ');
        await searchTasks(user.id, keyword);
        break;

      case '6':
        console.log('\nLogging out...');
        running = false;
        break;

      default:
        console.log('Invalid choice. Please enter 1-6.');
    }
  }
}

module.exports = taskMenu;