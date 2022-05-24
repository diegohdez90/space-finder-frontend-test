import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../models/User';
import { UserAttribute } from '../models/UserAttribute';
import { AuthService } from '../services/AuthService';

interface Props {
  user: User | undefined,
  authService: AuthService
}

interface State {
  userAttributes: UserAttribute[]
}

class Profile extends Component<Props, State> {

  render() {

    let profileSpace: any;

    if (this.props.user) {
      profileSpace = <h3>Hello {this.props.user.name}</h3>
    } else {
      profileSpace = <div>
        Please <Link to='/login'>Login</Link>
      </div>
    }
    return (
      <div>
        Welcome to profile page!
        {
          profileSpace
        }
      </div>
    )
  }
}

export default Profile;
