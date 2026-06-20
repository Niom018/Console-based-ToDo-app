function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPriority(priority) {
  return ['Low', 'Medium', 'High'].includes(priority);
}

function isValidStatus(status) {
  return ['Pending', 'Completed'].includes(status);
}

function isValidDate(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date);
}

module.exports = { isValidEmail, isValidPriority, isValidStatus, isValidDate };