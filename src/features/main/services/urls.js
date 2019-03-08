import config from '../../../config';

const apiPath = `${config.api}`;

const urls = {
    'message/fetch': () => `${apiPath}/`
};

const request = (name, ...args) => (urls[name] ? urls[name].apply(undefined, args) : '');

export default { request };
