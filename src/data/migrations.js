const database = require('./database');
const Sequelize = require('sequelize');
const constants = require("../others/constants");
const queryInterface = database.getQueryInterface();

async function runMigrations() {

  await queryInterface.addColumn('song',
    'title', {
      type: Sequelize.STRING(constants.MAX_STR_LEN),
      allowNull: false,
      validate: {notEmpty: true},
      unique: false
    })
    .catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song',
    'description', {
      type: Sequelize.STRING(constants.MAX_STR_LEN),
      allowNull: true,
      unique: false,
      defaultValue: ''
    })
    .catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song',
    'artist', {
      type: Sequelize.STRING(constants.FIREBASE_MAX_LEN),
      allowNull: false,
      validate: {notEmpty: true},
      unique: false
    })
    .catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song',
    'author', {
      type: Sequelize.STRING(constants.MAX_STR_LEN),
      allowNull: true,
      unique: false,
      defaultValue: ''
    })
    .catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song',
    'subscription', {
      type: Sequelize.STRING(constants.MAX_STR_LEN),
      allowNull: true,
      unique: false,
      defaultValue: 'FREE'
    })
    .catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song',
    'genre', {
      type: Sequelize.STRING(constants.MAX_STR_LEN),
      allowNull: true,
      unique: false,
    })
    .catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song',
    'link', {
      type: Sequelize.STRING(constants.MAX_STR_LEN),
      allowNull: false,
      validate: {notEmpty: true},
      unique: true
    })
    .catch(error => console.log(error.toString()));

  await queryInterface.addColumn('playlists',
    'isCollaborative', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
    .catch(error => console.log(error.toString()));
}

//TODO
module.exports = {
  runMigrations
}
