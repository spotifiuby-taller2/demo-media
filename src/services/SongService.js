const utils = require("../others/utils");
const Logger = require("./Logger");
const {postToGateway} = require("../others/utils");
const {Song} = require("../data/Media");
const {Op} = require('sequelize');
const constants = require('../others/constants');

async function newSong(req, res) {
  Logger.info("Creando nueva cancion.");
  const {title, description, artists, author, subscription, genre, link} = req.body;
  if (utils.areAnyUndefined([title, artists, link])) {
    Logger.error(`Error: title, artists y link son obligatorios.`);
    utils.setErrorResponse(`Error: title, artists y link son obligatorios.`, 400, res);
    return;
  }
  const saved = await Song.create(
    {
      title: title,
      description: description,
      artists: artists,
      author: author,
      subscription: subscription,
      genre: genre,
      link: link
    }
  ).catch(error => {
    Logger.error(`Error al intentar guardar en la base de datos: ${error.toString()}`);
    utils.setErrorResponse(`Error tratando de crear la cancion.`, 500, res);
  });

  if (saved === undefined) {
    Logger.error(`Error al intentar guardar en la base de datos.`);
    utils.setErrorResponse(`Error tratando de crear la cancion.`, 500, res);
  }
  if (res.statusCode >= 400) return;
  Logger.info("Cancion guardada.")
  utils.setBodyResponse(saved, 200, res);
}

async function getSongs(req, res) {
  Logger.info("Obteniendo las canciones")
  const {title, artist, genre, subscription} = req.query;
  const where = {};
  if (title !== undefined) where.title = title
  if (artist !== undefined) where.artists = {[Op.contains]: [artist]}
  if (genre !== undefined) where.genre = genre
  if (subscription !== undefined) where.subscription = subscription

  const songs = await Song.findAll({
      where: where,
      attributes: ['id', 'title', 'description', 'artists', 'author', 'subscription', 'genre', 'link']
    }
  ).catch(error => {
    Logger.error(`No se pudieron obtener las canciones de la base de datos: ${error.toString()}`);
    utils.setErrorResponse("No se pudieron obtener las canciones", 500, res);
  });

  if (songs === null || songs === undefined) {
    Logger.error("No se pudieron obtener las canciones de la base de datos");
    utils.setErrorResponse("No se pudieron obtener las canciones", 500, res);
  }
  if (res.statusCode >= 400) return;
  Logger.info(`Canciones obtenidas: ${songs.length}`)
  utils.setBodyResponse(songs, 200, res);
}

async function getSong(req, res) {
  Logger.info("Get song by id");
  const id = req.params.id;
  const song = await Song.findOne({
    where: {id},
    attributes: ['id', 'title', 'description', 'artists', 'author', 'subscription', 'genre', 'link']
  }).catch(error => {
    Logger.error(`No se pudo obtener la cancion de la base de datos: ${error.toString()}`);
    utils.setErrorResponse("No se pudo obtener la cancion", 500, res);
  });

  if (song === undefined || song === null) {
    Logger.error("No se pudo obtener la cancion de la base de datos");
    utils.setErrorResponse("No se pudo obtener la cancion", 500, res);
  }

  if (res.statusCode >= 400) return;

  const requestBody = {
    usersIds: song.artists,

    redirectTo: constants.USERS_HOST + constants.PARSE_USERS_URL
  }

  const response = await postToGateway(requestBody);

  if (response.error !== undefined) {
    Logger.error("No se pudo obtener los artistas de la canción.");
    Logger.error(response.error);
  } else {
    song.artists = response;
  }

  Logger.info(`Cancion obtenida: ${song.title}`)
  utils.setBodyResponse(song, 200, res);
}

module.exports = {newSong, getSongs, getSong};
