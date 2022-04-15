const swaggerConfig = {
    definition: {
        info: {
            title: "Media API",
        },
        servers: [
            {
                url: 'http://localhost:4485',
                description: 'Local server'
            },
            {
                url: 'https://HEROKU',
                description: 'Prod server'
            }
        ]
    },
    apis: ["./src/main/routes.js"]
}

module.exports = {
    swaggerConfig
};
