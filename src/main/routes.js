const express = require('express')
const router = express.Router()
const constants = require('../others/constants');
const SongService = require('../services/SongService');
const AlbumService = require('../services/AlbumService');
const PlaylistService = require('../services/PlaylistService');
const Logger = require("../services/Logger");

/**
 * @swagger
 * tags:
 *    name: Health check
 * /health-check:
 *    get:
 *      tags: [Health check]
 *      summary: health check.
 *      description: Check the status of application.
 *      responses:
 *          "200":
 *              description: Application up and running
 *          "404":
 *               description: "Not found."
 *          "500":
 *              description: "Internal Server Error: Cannot response the request"
 */
router.get('/health-check', async (req, res) => {
  Logger.request("Health-check.");
  res.send('OK');
});

router.post(constants.SONG_URL, async (req, res) => {
  Logger.request("Crear nueva cancion.");
  await SongService.newSong(req, res);
});

router.get(constants.SONG_URL, async (req, res) => {
  Logger.request("Obtener canciones.");
  await SongService.getSongs(req, res);
});

router.get(constants.SONG_URL + "/:id", async (req, res) => {
  Logger.request("Obtener cancion.");
  await SongService.getSong(req, res);
});

router.post(constants.ALBUM_URL, async (req, res) => {
  Logger.request("Crear nuevo album");
  await AlbumService.newAlbum(req, res);
});

router.post(constants.PLAYLIST_URL, async (req, res) => {
  Logger.request("Crear nueva playlist");
  await PlaylistService.newPlaylist(req, res);
});

router.get(`${constants.PLAYLIST_URL}/:id`, async (req, res) => {
  Logger.request('Obtener playlist')
  await PlaylistService.getPlaylist(req, res);
})

module.exports = router;
