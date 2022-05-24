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

  state: State = {
    userAttributes: []
  }

  componentDidMount() {
    if (this.props.user) {
      this.props
        .authService
        .getUserAttributes(this.props.user)
        .then(res => {
          this.setState({
            userAttributes: res
          });
        });
    }
  }

  private renderUserAttributes(): React.ReactNode {
    const rows = [];
    for (const userAttribute of this.state.userAttributes) {
      rows.push(<tr>
        <td>{userAttribute.name}</td>
        <td>{userAttribute.value}</td>
      </tr>)
    }
    return <table>
      <tbody>
        {
          rows
        }
      </tbody>
    </table>
  }

  render() {

    let profileSpace: any;

    if (this.props.user) {
      profileSpace = <>
        <h3>Hello {this.props.user.name}</h3>
        {this.renderUserAttributes()}
      </>
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
