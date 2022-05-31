import React, { Component } from 'react'
import { User } from '../models/User'

interface State {
  user: User | undefined;
}

class Home extends Component<{}, {}> {


  render() {
    return (
      <div>
        Welcome to the Home page!
      </div>
    )
  }
}

export default Home;
