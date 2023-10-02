const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("todo_db", "TodoManagingSystem", "Managetodos", {
    host: "localhost",
    dialect: "mysql"
  });
  
module.exports = sequelize;
