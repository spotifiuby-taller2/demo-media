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

    artists: {
      type: Sequelize.ARRAY(Sequelize.STRING(constants.FIREBASE_MAX_LEN)),
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
      allowNull: false,
      unique: false,
      defaultValue: 'FREE'
    },

    genre: {
      type: Sequelize.STRING(constants.MAX_STR_LEN),
      allowNull: true,
      unique: false,
    },

    link: {
      type: Sequelize.STRING(constants.MAX_STR_FIREBASE_LINK),
      allowNull: false,
      validate: {notEmpty: true},
      unique: false
    }
  },
  {
    indexes: [
      /*{
        fields: ['title']
      },*/
      {
        fields: ['artists']
      },
      /*{
        fields: ['genre']
      }*/
    ]
  });


const Album = database.define('album',
  {
    title: {
      type: Sequelize.STRING(constants.MAX_STR_LEN),
      allowNull: false,
      validate: {notEmpty: true},
      unique: false
    },

    genre: {
      type: Sequelize.STRING(constants.MAX_STR_LEN),
      allowNull: false,
      validate: {notEmpty: true},
      unique: false,
    },

    link: {
      type: Sequelize.STRING(constants.MAX_STR_FIREBASE_LINK),
      allowNull: true,
      unique: false
    },

    artists: {
      type: Sequelize.ARRAY(Sequelize.STRING(constants.FIREBASE_MAX_LEN)),
      allowNull: false,
      validate: {notEmpty: true},
      unique: false
    },

    subscription: {
      type: Sequelize.STRING(constants.MAX_STR_LEN),
      allowNull: false,
      unique: false,
      defaultValue: 'FREE'
    }
  },
  {
    indexes: [
      {
        fields: ['title']
      },
      {
        fields: ['artists']
      },
      {
        fields: ['genre']
      }
    ]
  });


const AlbumSong = database.define('album_song', {
  albumId: {
    type: Sequelize.INTEGER,
    references: {
      model: Album,
      key: 'id'
    }
  },
  songId: {
    type: Sequelize.INTEGER,
    references: {
      model: Song,
      key: 'id'
    }
  }
});

Album.belongsToMany(Song, {through: AlbumSong});
Song.belongsToMany(Album, {through: AlbumSong});

const Playlist = database.define('playlist',
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

    owner: {
      type: Sequelize.STRING(constants.FIREBASE_MAX_LEN),
      allowNull: false,
      validate: {notEmpty: true},
      unique: false
    },

    isCollaborative: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    indexes: [
      {
        fields: ['title']
      },
      {
        fields: ['owner']
      },
    ]
  });

const PlaylistSong = database.define('playlist_song', {
  playlistId: {
    type: Sequelize.INTEGER,
    references: {
      model: Playlist,
      key: 'id'
    }
  },
  songId: {
    type: Sequelize.INTEGER,
    references: {
      model: Song,
      key: 'id'
    }
  }
});

Playlist.belongsToMany(Song, {through: PlaylistSong});
Song.belongsToMany(Playlist, {through: PlaylistSong});

module.exports = {
    Song,
    Album,
    Playlist,
    AlbumSong,
    PlaylistSong};
