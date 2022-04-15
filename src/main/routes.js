const express = require('express')
const router = express.Router()
const constants = require('../others/constants');
const SongService = require('../services/SongService');
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
router.get('/health-check', (req, res) => {
    Logger.request("Health-check.");
    res.send('OK');
});

router.post(constants.SONG_URL, (req, res) => {
    Logger.request("Crear nueva cancion.");
    SongService.newSong(req, res);
});

router.get(constants.SONG_URL, (req, res) => {
    Logger.request("Obtener todas las canciones.");
    SongService.getSongs(req, res);
});

module.exports = router;
