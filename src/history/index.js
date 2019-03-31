import { createBrowserHistory } from 'history';

// if client run in browser
const history = typeof window !== 'undefined' ? createBrowserHistory() : null;

export default history;
