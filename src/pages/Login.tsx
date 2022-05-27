import React, { ChangeEvent, Component, FormEvent } from 'react'
import { AuthService } from '../services/AuthService';
import { User } from '../models/User';
import history from '../utils/history';

interface Props {
  authService: AuthService,
  setUser: (user: User) => void,
}

interface State {
  username: string,
  password: string,
  loginAttempted: boolean,
  loginSuccessfull: boolean
}

class Login extends Component<Props, State> {

  state: State = {
    username: '',
    password: '',
    loginAttempted: false,
    loginSuccessfull: false
  }

  private onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      username: e.target.value
    });
  }

  private onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value
    });
  }

  private onLoginEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({
      loginAttempted: true
    });
    const res = await this.props
      .authService
      .login(this.state.username, this.state.password);
    
      if (res) {
        this.setState({
          loginSuccessfull: true
        });
        this.props.setUser(res);
        history.push('/profile');
      } else {
        this.setState({
          loginSuccessfull: false
        });
      }
  }

  render() {
    const {
      username,
      password,
      loginAttempted,
      loginSuccessfull
    } = this.state;

    let loginMessage: any;

    if(loginAttempted) {
      if (loginSuccessfull) {
        loginMessage = <div className='login-message'>
            <span>Login successfull</span>
          </div>;
      } else {
        loginMessage = <div className='login-message'>
          <span>Login failed</span>
        </div>;
      }
    }
    return (
      <div>
        <h2>Login to spaces</h2>
        <form
          onSubmit={this.onLoginEvent}
        >
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={this.onChangeUsername}
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.onChangePassword}
          />
          <button
            role='button'
            type='submit'
          >Login</button>
          {
            loginMessage
          }
        </form>

      </div>
    )
  }
}

export default Login;
