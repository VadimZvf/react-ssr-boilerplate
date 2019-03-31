const express = require('express');
const axios = require('axios').default;

const apiServerPath = 'http://localhost:8082';
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { data } = await axios.post(`${apiServerPath}/login`, {
            login: req.body.login,
            password: req.body.password
        });

        // save tokens in client side in httpOnly cookies
        res.cookie('user', JSON.stringify(data), { httpOnly: true });
        res.send({ redirect: '/' });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            res.sendStatus(401);
        } else {
            res.sendStatus(500);
        }
    }
});

export async function refreshToken(req) {
    console.log(req.cookies);
    // TODO: add logic
    // const { data } = await axios.post(`${apiServerPath}/refresh`, {
    //     refreshToken: req.body.login,
    // });

    // res.cookie('user', data.token, { httpOnly: true });
    // res.send({ redirect: '/' });
}

export default router;
