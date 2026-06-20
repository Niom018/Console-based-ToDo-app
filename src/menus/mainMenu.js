const readline = require('readline-sync');
const { registerUser, loginUser } = require('../services/authService');
const taskMenu = require('./taskMenu');

async function mainMenu() {
  let running = true;

  while (running) {
    console.log('\n============================');
    console.log('     Welcome to Todo App');
    console.log('============================');
    console.log('1. Register');
    console.log('2. Login');
    console.log('3. Exit');
    console.log('============================');

    const choice = readline.question('Enter your choice: ');

    switch (choice) {
      case '1':
        console.log('\n--- Register ---');
        const name = readline.question('Enter your name: ');
        const regEmail = readline.question('Enter your email: ');
        const regPassword = readline.question('Enter your password: ', { hideEchoBack: true });
        await registerUser(name, regEmail, regPassword);
        break;

      case '2':
        console.log('\n--- Login ---');
        const loginEmail = readline.question('Enter your email: ');
        const loginPassword = readline.question('Enter your password: ', { hideEchoBack: true });
        const user = await loginUser(loginEmail, loginPassword);
        if (user) {
          await taskMenu(user);
        }
        break;

      case '3':
        console.log('\nGoodbye! 👋');
        running = false;
        break;

      default:
        console.log('Invalid choice. Please enter 1, 2, or 3.');
    }
  }
}

module.exports = mainMenu;