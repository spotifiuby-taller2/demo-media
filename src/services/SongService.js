const utils = require("../others/utils");
const Logger = require("./Logger");
const Song = require("../data/Song");

async function newSong(req, res) {
    Logger.info("Creando nueva cancion.");

    const {title, description, artist, author, susbcription, gender, link} = req.body;

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
            subscription: susbcription,
            gender: gender,
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
    Logger.info("Obteniendo todas las canciones")

    const songs = await Song.findAll(
        {attributes: ['id', 'title', 'description', 'artist', 'author', 'subscription', 'gender', 'link']}
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

module.exports = {newSong, getSongs};