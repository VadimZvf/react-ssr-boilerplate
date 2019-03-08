const express = require('express');
const app = express();
const port = 8081;

// Remove it
// this server only for example
app.get('/*', (req, res) => {
    res.send('This message from api server!');
});

/* eslint-disable no-console */
app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
/* eslint-enable no-console */
