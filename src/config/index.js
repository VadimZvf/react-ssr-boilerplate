import defaultConfig from './default.json';

// api paths should be full.
// Like http://example.com.
// because SSR can make requests to api server
const modifier = require(`./${process.env.NODE_ENV}.json`);

export default { ...defaultConfig, ...modifier };
