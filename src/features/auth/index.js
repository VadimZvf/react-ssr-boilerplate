import * as React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import login from './actions/login';

class Login extends React.Component {
    static propTypes = {
        login: propTypes.func
    };

    state = {
        login: '',
        password: ''
    };

    handleChangeLogin = e => this.setState({ login: e.target.value });
    handleChangePassword = e => this.setState({ password: e.target.value });

    handleSubmit = e => {
        e.preventDefault();
        const { login, password } = this.state;

        this.props.login({ login, password });
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.login} onChange={this.handleChangeLogin} />
                    <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    { login }
)(Login);
