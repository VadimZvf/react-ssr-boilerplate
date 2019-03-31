import api from '../services/api';
import history from '../../../history';

export default ({ login, password }) => async () => {
    try {
        const { data } = await api.login({ login, password });

        // if client run in browser
        if (window && data && data.redirect) {
            history.push(data.redirect);
        }

        /* eslint-disable no-empty */
    } catch (error) {}
    /* eslint-enable no-empty */
};
