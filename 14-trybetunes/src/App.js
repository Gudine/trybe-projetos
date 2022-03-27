import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: 0,
    };
  }

  startLoading = () => this.setState((prev) => ({ loading: prev.loading + 1 }));

  stopLoading = () => this.setState((prev) => ({ loading: prev.loading - 1 }));

  render() {
    const { loading } = this.state;
    // Fonte do Header: https://stackoverflow.com/a/53074599

    return (
      <HashRouter>
        {!!loading && <Loading />}
        <Route
          exact
          path={ /\/.+/ }
          render={ (props) => (
            <Header
              { ...props }
              startLoading={ this.startLoading }
              stopLoading={ this.stopLoading }
            />
          ) }
        />
        <Switch>
          <Route
            path="/album/:id"
            render={ (props) => (
              <Album
                { ...props }
                startLoading={ this.startLoading }
                stopLoading={ this.stopLoading }
              />
            ) }
          />
          <Route
            path="/profile/edit"
            render={ (props) => (
              <ProfileEdit
                { ...props }
                startLoading={ this.startLoading }
                stopLoading={ this.stopLoading }
              />
            ) }
          />
          <Route
            path="/search"
            render={ (props) => (
              <Search
                { ...props }
                startLoading={ this.startLoading }
                stopLoading={ this.stopLoading }
              />
            ) }
          />
          <Route
            path="/favorites"
            render={ (props) => (
              <Favorites
                { ...props }
                startLoading={ this.startLoading }
                stopLoading={ this.stopLoading }
              />
            ) }
          />
          <Route
            path="/profile"
            render={ (props) => (
              <Profile
                { ...props }
                startLoading={ this.startLoading }
                stopLoading={ this.stopLoading }
              />
            ) }
          />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                startLoading={ this.startLoading }
                stopLoading={ this.stopLoading }
              />
            ) }
          />
          <Route
            path="*"
            render={ (props) => (
              <NotFound
                { ...props }
                startLoading={ this.startLoading }
                stopLoading={ this.stopLoading }
              />
            ) }
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
