const utils = require("../others/utils");
const Logger = require("./Logger");
const {Song, Album} = require("../data/Media");

async function newAlbum(req, res) {

  const {title, artist, genre, subscription, link, songs} = req.body;

  if (utils.areAnyUndefined([title, artist, genre, subscription, songs])) {
    Logger.error(`Error: title, artist, genre, subscription y songs son campos obligatorios.`);
    utils.setErrorResponse(`Error: title, artist, genre, subscription y songs son campos obligatorios.`, 400, res);
    return;
  }

  const savedSongs = await Song.findAll({
      attributes: ['id', 'title', 'description', 'artist', 'author', 'genre', 'subscription', 'link'],
      where: {
        id: songs
      }
    }
  ).catch(error => {
    Logger.error(`No se pudieron obtener las canciones de la base de datos: ${error.toString()}`);
    utils.setErrorResponse("No se pudieron obtener las canciones", 500, res);
  });

  if (savedSongs === null || savedSongs === undefined) {
    Logger.error("No se pudieron obtener las canciones de la base de datos");
    utils.setErrorResponse("No se pudieron obtener las canciones", 500, res);
    return
  }

  const saved = await Album.create(
    {
      title: title,
      artist: artist,
      genre: genre,
      subscription: subscription,
      link: link,
    }
  ).then(async alb => {
    await alb.addSongs(savedSongs);
    return {
      id: alb.id,
      title: alb.title,
      artist: alb.artist,
      genre: alb.genre,
      subscription: alb.subscription,
      link: alb.link,
      songs: savedSongs
    }
  }).catch(error => {
    Logger.error(`Error al intentar guardar en la base de datos: ${error.toString()}`);
    utils.setErrorResponse(`Error tratando de crear el album.`, 500, res);
  });

  if (saved === undefined) {
    Logger.error(`Error al intentar guardar en la base de datos.`);
    utils.setErrorResponse(`Error tratando de crear la cancion.`, 500, res);
  }
  if (res.statusCode >= 400) return;
  utils.setBodyResponse(saved, 200, res);
}

module.exports = {newAlbum};
