import React from 'react';
import { User } from './models/User';
import Login from './pages/Login';
import { AuthService } from './services/AuthService';

interface State {
  user: User
}

class App extends React.Component<{}, State> {

  private authService: AuthService = new AuthService();

  private setUser = (user: User) => {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <>
        <Login
          authService={this.authService}
          setUser={this.setUser}
        />
        <h1>App</h1>
      </>
    );
  }
};

export default App;
