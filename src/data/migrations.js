const database = require('./database');
const Sequelize = require('sequelize');
const constants = require("../others/constants");
const queryInterface = database.getQueryInterface();

async function runMigrations() {

  await queryInterface.addColumn('song', 'title', {
    type: Sequelize.STRING(constants.MAX_STR_LEN),
    allowNull: false,
    validate: {notEmpty: true},
    unique: false
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song', 'description', {
    type: Sequelize.STRING(constants.MAX_STR_LEN),
    allowNull: true,
    unique: false,
    defaultValue: ''
  }).catch(error => console.log(error.toString()));

  await queryInterface.removeColumn('song', 'artist')
    .catch(e => {
      console.log(e);
    });

  await queryInterface.addColumn('song', 'artists', {
    type: Sequelize.ARRAY(Sequelize.STRING(constants.FIREBASE_MAX_LEN)),
    allowNull: false,
    validate: {notEmpty: true},
    unique: false
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song', 'author', {
    type: Sequelize.STRING(constants.MAX_STR_LEN),
    allowNull: true,
    unique: false,
    defaultValue: ''
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song', 'subscription', {
    type: Sequelize.STRING(constants.MAX_STR_LEN),
    allowNull: false,
    unique: false,
    defaultValue: 'FREE'
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song', 'genre', {
    type: Sequelize.STRING(constants.MAX_STR_LEN),
    allowNull: true,
    unique: false,
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('song', 'link', {
    type: Sequelize.STRING(constants.MAX_STR_FIREBASE_LINK),
    allowNull: false,
    validate: {notEmpty: true},
    unique: false
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('album', 'title', {
    type: Sequelize.STRING(constants.MAX_STR_LEN),
    allowNull: false,
    validate: {notEmpty: true},
    unique: false,
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('album', 'genre', {
    type: Sequelize.STRING(constants.MAX_STR_LEN),
    allowNull: false,
    validate: {notEmpty: true},
    unique: false
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('album', 'link', {
    type: Sequelize.STRING(constants.MAX_STR_FIREBASE_LINK),
    allowNull: true,
    unique: false
  }).catch(error => console.log(error.toString()));

  await queryInterface.removeColumn('album', 'artist')
    .catch(e => {
      console.log(e);
    });

  await queryInterface.addColumn('album', 'artists', {
    type: Sequelize.ARRAY(Sequelize.STRING(constants.FIREBASE_MAX_LEN)),
    allowNull: false,
    validate: {notEmpty: true},
    unique: false
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('album', 'subscription', {
    type: Sequelize.STRING(constants.MAX_STR_LEN),
    allowNull: false,
    unique: false,
    defaultValue: 'FREE'
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('album_song', 'albumId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Album',
      key: 'id'
    }
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('album_song', 'songId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Song',
      key: 'id'
    }
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('playlists', 'title', {
    type: Sequelize.STRING(constants.MAX_STR_LEN),
    allowNull: false,
    validate: {notEmpty: true},
    unique: false
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('playlists', 'description', {
    type: Sequelize.STRING(constants.MAX_STR_LEN),
    allowNull: true,
    unique: false,
    defaultValue: ''
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('playlists', 'owner', {
    type: Sequelize.STRING(constants.FIREBASE_MAX_LEN),
    allowNull: false,
    validate: {notEmpty: true},
    unique: false
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('playlists', 'isCollaborative', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }).catch(error => console.log(error.toString()));

  await queryInterface.dropTable('album_playlist')
    .catch(error => console.log(error.toString()));

  await queryInterface.addColumn('playlist_song', 'playlistId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Playlist',
      key: 'id'
    }
  }).catch(error => console.log(error.toString()));

  await queryInterface.addColumn('playlist_song', 'songId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Song',
      key: 'id'
    }
  }).catch(error => console.log(error.toString()));
}

module.exports = {runMigrations}
