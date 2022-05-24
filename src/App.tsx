import React from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import { User } from './models/User';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CustomRouter from './router/CustomRouter';
import { AuthService } from './services/AuthService';
import history from './utils/history';

interface State {
  user: User | undefined
}

class App extends React.Component<{}, State> {

  state: State = {
    user: undefined
  };

  private authService: AuthService = new AuthService();

  private setUser = (user: User) => {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <div className='wrapper'>
        <CustomRouter
          history={history}
        >
          <NavBar user={this.state.user}/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route
              path='/login'
              element={<Login
                authService={this.authService}
                setUser={this.setUser}
              />}
            />
          </Routes>
        </CustomRouter>
      </div>
    );
  }
};

export default App;
