const database = require('./database');
const Sequelize = require('sequelize');
const constants = require("../others/constants");
const {Song,
       Playlist,
       Album} = require("../data/Media");

const queryInterface = database.getQueryInterface();

async function runMigrations() {
    /* ================ EXAMPLES ===================== */
    /* await queryInterface.removeColumn('users',
                                  'isAdmin');
                       .catch(e => {
                        console.log(e);
                       } ); */
    /*
       await queryInterface.addColumn(Song.tableName,
           'isBlocked', {
                  type: Sequelize.BOOLEAN,
                  allowNull: false,
                  defaultValue: false
           }).catch(error => console.log(error.toString())); */


    /* await queryInterface.changeColumn('users ',
      'walletId', {
        type: Sequelize.INTEGER,
        unique: true
      },)
      .catch(error => {
        console.log(error.toString());
      });*/


       await queryInterface.addColumn(Song.tableName,
           'isBlocked', {
                  type: Sequelize.BOOLEAN,
                  allowNull: false,
                  defaultValue: false
           }).catch(error => console.log(error.toString()));

       await queryInterface.addColumn(Playlist.tableName,
           'isBlocked', {
                  type: Sequelize.BOOLEAN,
                  allowNull: false,
                  defaultValue: false
           }).catch(error => console.log(error.toString()));

       await queryInterface.addColumn(Album.tableName,
                                      'isBlocked', {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
       }).catch(error => console.log(error.toString()));

       await queryInterface.createTable('song_favs', {
               id: {
                   type: Sequelize.INTEGER,
                   autoIncrement: true,
                   primaryKey: true
               },
              songId: {
                     type: Sequelize.INTEGER,
              },
              userId: {
                     type: Sequelize.STRING(constants.MAX_STR_LEN),
              },
               createdAt: {
                   type: Sequelize.DATE,
                   allowNull: false
               },
               updatedAt: {
                   type: Sequelize.DATE,
                   allowNull: false
               },
       } ).catch(error => console.log(error.toString()));

    await queryInterface.createTable('album_favs', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        songId: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.STRING(constants.MAX_STR_LEN),
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
    } ).catch(error => console.log(error.toString()));

    await queryInterface.addColumn(Song.tableName, 'artwork',{
        type: Sequelize.STRING(constants.MAX_STR_FIREBASE_LINK),
        allowNull: true,
        unique: false,
    }).catch(e => console.log(e.toString()));

    await queryInterface.addColumn(Playlist.tableName, 'artwork',{
        type: Sequelize.STRING(constants.MAX_STR_FIREBASE_LINK),
        allowNull: true,
        unique: false,
    }).catch(e => console.log(e.toString()));

    await queryInterface.changeColumn(Song.tableName,
        'subscription', {
            type: Sequelize.STRING(constants.MAX_STR_LEN),
            allowNull: false,
            unique: false,
            defaultValue: 'free'
        },)
        .catch(error => {
            console.log(error.toString());
        });

    await queryInterface.changeColumn(Album.tableName,
        'subscription', {
            type: Sequelize.STRING(constants.MAX_STR_LEN),
            allowNull: false,
            unique: false,
            defaultValue: 'free'
        },)
        .catch(error => {
            console.log(error.toString());
        });
}

module.exports = {
    runMigrations
}
