# 📝 Todo App - Console Based

A console-based CRUD Todo application built with **JavaScript (Node.js)** and **MySQL**.

## 🚀 Features
- User Registration & Login
- Add, View, Edit, Delete Tasks
- Search Tasks by title or description
- Input validation for all fields
- MySQL database integration

## 🛠️ Tech Stack
- Node.js
- MySQL2
- dotenv
- readline-sync

## ⚙️ Setup Instructions

1. Clone the repository
```bash
   git clone https://github.com/Niom018/Console-based-ToDo-app.git
   cd todo-app
```

2. Install dependencies
```bash
   npm install
```

3. Create `.env` file from example
```bash
   cp .env.example .env
```

4. Fill in your MySQL credentials in `.env`
```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=my_password
   DB_NAME=todo_app
   DB_PORT=3306
```

5. Create the database in MySQL
```sql
   CREATE DATABASE todo_app;
```

6. Run the application
```bash
   node app.js
```

## 📁 Project Structure

Console-based-ToDo-app/

├── src/

│   ├── config/

│   │   └── db.js

│   ├── models/

│   │   └── initDB.js

│   ├── services/

│   │   ├── authService.js

│   │   └── taskService.js

│   ├── menus/

│   │   ├── mainMenu.js

│   │   └── taskMenu.js

│   └── utils/

│       └── validators.js

├── .env.example

├── .gitignore

├── app.js

└── README.md

## 🗄️ Database Schema

### Users Table
| Column   | Type          |
|----------|---------------|
| id       | INT (PK)      |
| name     | VARCHAR(100)  |
| email    | VARCHAR(100)  |
| password | VARCHAR(255)  |

### Tasks Table
| Column      | Type                     |
|-------------|--------------------------|
| id          | INT (PK)                 |
| userId      | INT (FK)                 |
| title       | VARCHAR(255)             |
| description | TEXT                     |
| dueDate     | DATE                     |
| priority    | ENUM(Low, Medium, High)  |
| status      | ENUM(Pending, Completed) |
| createdAt   | TIMESTAMP                |
| updatedAt   | TIMESTAMP                |

## 👤 Author
- **Name:** Niamul Hasan
- **Batch:** 18
- **Student ID:** NH91974
- **Institute:** Daffodil International University