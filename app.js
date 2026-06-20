require('dotenv').config();
const initDB = require('./src/models/initDB');
const mainMenu = require('./src/menus/mainMenu');

async function main() {
  await initDB();
  await mainMenu();
  process.exit(0);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});