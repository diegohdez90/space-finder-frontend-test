import React, { Component } from 'react'
import { User } from '../models/User'

interface State {
  user: User | undefined;
}

class Home extends Component<{}, State> {


  render() {
    return (
      <div>Home</div>
    )
  }
}

export default Home;
