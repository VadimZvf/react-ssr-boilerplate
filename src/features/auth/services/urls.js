import config from '../../../config';

const apiPath = `${config.authApi}`;

const urls = {
    login: () => `${apiPath}/login`
};

const request = (name, ...args) => (urls[name] ? urls[name].apply(undefined, args) : '');

export default { request };
