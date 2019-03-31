// redirect api requests to api-server in dev mode.
// Only for devexperience
// In production this will do nginx
// Be careful because it can make infinity recursive requests
const apiServerPath = 'http://localhost:8081';
const proxy = require('http-proxy-middleware');

const router = proxy({ target: apiServerPath, changeOrigin: true });

export default router;
