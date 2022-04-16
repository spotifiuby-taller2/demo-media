const utils = require("../others/utils");
const Logger = require("./Logger");
const {Song, Playlist} = require("../data/Media");

const getPlaylist = async (req, res) => {
  try {
    const playlist = await findPlaylist(req.params.id);
    res.status(200).json(playlist);
  } catch (error) {
    res.status(error.status).json(error.body);
  }
}

const findPlaylist = async id => {
  return Playlist.findOne({where: {id}, include: {model: Song, through: {attributes: []}}})
    .catch(error => {
      Logger.error(`Error al intentar obtener la playlist en la base de datos: ${error.toString()}`);
      throw utils.newError(500, 'Error tratando de obtener la playlist.');
    })
    .then(playlist => {
      if (playlist == null) {
        const message = `Playlist with id ${id} does not exist`;
        Logger.error(message);
        throw utils.newError(404, message);
      }
      return playlist;
    })
}

const newPlaylist = async (req, res) => {
  const {title, description, owner, isCollaborative, songs} = req.body;

  if (utils.areAnyUndefined([title, owner, songs])) {
    Logger.error('Error: title, owner y songs son obligatorios.');
    utils.setErrorResponse('title, owner y songs son obligatorios.', 400, res);
    return;
  }

  try {
    const playlist = await createPlaylist({title, description, owner, isCollaborative, songs});
    res.status(200).json(playlist);
  } catch (error) {
    res.status(error.status).json(error.body);
  }
}

const createPlaylist = async (playlistData) => {
  const songs = await findSongs(playlistData.songs);

  return Playlist.create(
    {
      title: playlistData.title,
      description: playlistData.description,
      owner: playlistData.owner,
    }
  ).then(async playlist => {
    await playlist.addSongs(songs);
    return {...playlist.get({plain: true}), songs: songs};
  }).catch(error => {
    Logger.error(`Error al intentar guardar en la base de datos: ${error.toString()}`);
    throw utils.newError(500, 'Error tratando de crear la playlist.');
  });
}

const findSongs = async ids => {
  const savedSongs = await Song.findAll({
    attributes: ['id', 'title', 'description', 'artist', 'author', 'genre', 'subscription', 'link'], where: {id: ids},
  })
    .catch(error => {
      Logger.error(`No se pudieron obtener las canciones de la base de datos: ${error.toString()}`);
      throw utils.newError(500, 'Error al obtener las canciones');
    });

  if (ids.length !== savedSongs.length) {
    Logger.error('Hay canciones invalidas o no existentes');
    throw utils.newError(400, 'Hay canciones invalidas o no existentes');
  }

  return savedSongs;
}

module.exports = {
  getPlaylist,
  newPlaylist,
}
