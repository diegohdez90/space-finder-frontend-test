import React from 'react';
import { User } from './models/User';
import Login from './pages/Login';
import { AuthService } from './services/AuthService';

interface State {
  user: User
}

class App extends React.Component<{}, State> {

  private authService: AuthService = new AuthService();

  render() {
    return (
      <div>
        <Login authService={this.authService} />
        <h1>App</h1>
      </div>
    );
  }
};

export default App;
