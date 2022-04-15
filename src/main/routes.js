const express = require('express')
const router = express.Router()

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
router.get('/health-check', (req, res) =>
    res.send('OK')
);

module.exports = router;
