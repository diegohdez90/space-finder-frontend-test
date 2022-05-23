import React, { Component } from 'react'
import { User } from '../models/User'
import { AuthService } from '../services/AuthService';

interface State {
  user: User | undefined;
}

class Home extends Component<{}, State> {

  private authService: AuthService = new AuthService();

  render() {
    return (
      <div>Home</div>
    )
  }
}

export default Home;
