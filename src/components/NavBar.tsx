import React, { Component } from 'react'
import { User } from '../models/User';
import { Link } from 'react-router-dom';

interface Props {
  user: User | undefined
}

class NavBar extends Component<Props> {
  render() {
    let loginLogout: any;
    if (this.props.user) {
      loginLogout = <Link to='/logout' style={{
        float: 'right'
      }}>Logout</Link>
    } else {
      loginLogout = <Link to='/login' style={{
        float: 'right'
      }}>Login</Link>
    }
    return (
      <div className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/profile'>Profile</Link>
        {
          loginLogout
        }
      </div>
    )
  }
}

export default NavBar;
