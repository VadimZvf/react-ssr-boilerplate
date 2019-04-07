const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8082;

const user = {
    login: 'admin',
    password: 'test'
};

app.use(bodyParser.json());

// Remove it
// this server only for example
app.post('/login', (req, res) => {
    if (req.body.login === user.login && req.body.password === user.password) {
        res.send({ token: 'test-token', refreshToken: 'test refresh token' });
    } else {
        res.sendStatus(401);
    }
});

app.post('/refresh', (req, res) => {
    if (req.body.login === user.login && req.body.password === user.password) {
        res.send({ token: 'test-token', refreshToken: 'test refresh token' });
    } else {
        res.sendStatus(401);
    }
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
