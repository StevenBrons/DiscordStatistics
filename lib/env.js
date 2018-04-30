const env = require('node-env-file');

// Import the secret values (e.g. private discord key) from .env
env(__dirname + '/../.env');
