const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportHeight:1080,
        viewportWidth:1980,
        retries: {
            runMode: 1,
            openMode: 0
        },
        // eslint-disable-next-line
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
