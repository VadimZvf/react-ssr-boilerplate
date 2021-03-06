import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchMessage from './actions/message-fetch';

import styles from './index.css';

class Main extends React.Component {
    static propTypes = {
        message: propTypes.string,
        isPending: propTypes.bool,
        fetchMessage: propTypes.func
    };
    static defaultProps = {
        fetchMessage: () => {}
    };
    static fetchData = fetchMessage;

    state = {};

    componentDidMount() {
        this.props.fetchMessage();
    }

    render() {
        return (
            <div className={styles.wrap}>
                <h1 className={styles.title}>Hello!</h1>
                <p>{this.props.isPending ? 'Loading...' : this.props.message}</p>
            </div>
        );
    }
}

const mapStateToProps = globalState => {
    return {
        isPending: globalState.main.isPendingMessage,
        message: globalState.main.message
    };
};

export default connect(
    mapStateToProps,
    { fetchMessage }
)(Main);
