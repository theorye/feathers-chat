import React, { Component } from 'react';
import client from './feathers';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  login() {
    const { email, password } = this.state;

    return client.authenticate({
      strategy: 'local',
      email, password
    }).catch(error => this.setState({ error }));
  }

  signup() {
    const { email, password } = this.state;

    return client.service('users')
      .create({ email, password })
      .then(() => this.login());
  }


  render() {
    return <main className="login container login-container-wallpaper">
      <div className="row">
        <div className="col-12 col-6-tablet push-3-tablet text-center heading">
          <p>{this.state.error && this.state.error.message}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop login-container box-shadow border-radius">
          <div className="login-header-card border-radius box-shadow">
            <div className="login-title">Login</div>
            <div class="social-line">
              <a href="http://localhost:3030/auth/facebook">
                <img className="login-icon" src="http://localhost:3030/img/icons/Facebook.svg" />
              </a>
              <a href="http://localhost:3030/auth/google">
                <img className="login-icon" src="http://localhost:3030/img/icons/Google+.svg" />
              </a>
              <a href="http://localhost:3030/auth/github">
                <img className="login-icon" src="http://localhost:3030/img/icons/Github.svg" />
              </a>
            </div>
          </div>
          <form className="form">
            <div className="login-title">- Or create an account with us -</div>
            <fieldset>
              <input className="block border-radius box-shadow-light login-field" type="email" name="email" placeholder="email" onChange={ev => this.updateField('email', ev)} />
            </fieldset>

            <fieldset>
              <input className="block border-radius box-shadow-light login-field" type="password" name="password" placeholder="password" onChange={ev => this.updateField('password', ev)} />
            </fieldset>

            {/*<input type="checkbox" /> <label>Save Password</label>*/}

            <button type="button" className="button button-primary block signup box-shadow-light" onClick={() => this.login()}>
              Log in
            </button>

            <button type="button" className="button button-primary block signup box-shadow-light" onClick={() => this.signup()}>
              Signup
            </button>
          </form>
        </div>
      </div>
    </main>;
  }
}
