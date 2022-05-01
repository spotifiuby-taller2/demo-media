const database = require('./database');
const Sequelize = require('sequelize');
const constants = require("../others/constants");
const {Song,
       Playlist,
       Album,
       AlbumSong,
       PlaylistSong} = require("../data/Media");
const queryInterface = database.getQueryInterface();

async function runMigrations() {
}

module.exports = {runMigrations}
