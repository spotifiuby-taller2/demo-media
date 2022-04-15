const database = require('./database');
const Sequelize = require('sequelize');
const constants = require('../others/constants');

const Song = database.define('song',
    {
        title: {
            type: Sequelize.STRING(constants.MAX_STR_LEN),
            allowNull: false,
            validate: {notEmpty: true},
            unique: false
        },

        description: {
            type: Sequelize.STRING(constants.MAX_STR_LEN),
            allowNull: true,
            unique: false,
            defaultValue: ''
        },

        artist: {
            type: Sequelize.STRING(constants.FIREBASE_MAX_LEN),
            allowNull: false,
            validate: {notEmpty: true},
            unique: false
        },

        author: {
            type: Sequelize.STRING(constants.MAX_STR_LEN),
            allowNull: true,
            unique: false,
            defaultValue: ''
        },

        subscription: {
            type: Sequelize.STRING(constants.MAX_STR_LEN),
            allowNull: true,
            unique: false,
            defaultValue: 'FREE'
        },

        genre: {
            type: Sequelize.STRING(constants.MAX_STR_LEN),
            allowNull: true,
            unique: false,
        },

        link: {
            type: Sequelize.STRING(constants.MAX_STR_LEN),
            allowNull: false,
            validate: {notEmpty: true},
            unique: true
        }
    },
    {
        indexes: [
            {
                fields: ['title']
            },
            {
                fields: ['artist']
            },
            {
                fields: ['genre']
            }]
    });

module.exports = Song;