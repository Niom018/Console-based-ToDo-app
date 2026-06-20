const pool = require('../config/db');
const { isValidEmail } = require('../utils/validators');

async function registerUser(name, email, password) {
  // Validations
  if (!name || name.trim() === '') {
    console.log('Name cannot be empty.');
    return false;
  }
  if (!isValidEmail(email)) {
    console.log('Invalid email format.');
    return false;
  }
  if (password.length < 4) {
    console.log('Password must be at least 4 characters.');
    return false;
  }

  // Check if email already exists
  const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    console.log('Email already exists.');
    return false;
  }

  // Insert user
  await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name.trim(), email.trim(), password]
  );
  console.log('Registration successful!');
  return true;
}

async function loginUser(email, password) {
  // Check email exists
  const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) {
    console.log('Invalid email or password.');
    return null;
  }

  // Check password
  const user = users[0];
  if (user.password !== password) {
    console.log('Wrong credential');
    return null;
  }

  console.log('Login successful!');
  return user;
}

module.exports = { registerUser, loginUser };