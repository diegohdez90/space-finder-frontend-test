import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { User } from './models/User';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Spaces from './pages/Spaces';
import CustomRouter from './router/CustomRouter';
import { AuthService } from './services/AuthService';
import { DataService } from './services/DataService';
import history from './utils/history';

interface State {
  user: User | undefined
}

class App extends React.Component<{}, State> {

  state: State = {
    user: undefined
  };

  private authService: AuthService = new AuthService();
  private dataService: DataService = new DataService();

  private setUser = (user: User) => {
    this.setState({
      user: user
    });
  }

  render() {

    const { user } = this.state;

    return (
      <div className='wrapper'>
        <CustomRouter
          history={history}
        >
          <NavBar user={this.state.user}/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/profile'
              element={<Profile
                authService={this.authService}
                user={user}
              />}
            />
            <Route
              path='/login'
              element={<Login
                authService={this.authService}
                setUser={this.setUser}
              />}
            />
            <Route
              path='/spaces'
              element={<Spaces
                dataService={this.dataService}
              />}
            />
          </Routes>
        </CustomRouter>
      </div>
    );
  }
};

export default App;
