const utils = require("../others/utils");
const Logger = require("./Logger");
const {Song} = require("../data/Media");

async function newSong(req, res) {
  Logger.info("Creando nueva cancion.");

  const {title, description, artist, author, subscription, genre, link} = req.body;

  if (utils.areAnyUndefined([title, artist, link])) {
    Logger.error(`Error: title, artist y link son obligatorios.`);
    utils.setErrorResponse(`Error: title, artist y link son obligatorios.`, 400, res);
    return;
  }

  const saved = await Song.create(
    {
      title: title,
      description: description,
      artist: artist,
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

  const {title, artist, genre} = req.query;

  var where = title !== undefined ? {title} : {};
  where = artist !== undefined ? {title} : {};
  where = genre !== undefined ? {title} : {};

  const songs = await Song.findAll({
      where: {},
      attributes: ['id', 'title', 'description', 'artist', 'author', 'subscription', 'genre', 'link']
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
  Logger.info("Get song by:" + req.params.title)

}

module.exports = {newSong, getSongs, getSong};
