import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { startLoading, stopLoading } from './redux/actions';

const App = ({ loading }) => (
  <>
    {!!loading && <Loading />}
    <Route exact path="/(.+)" component={ Header } />
    <Switch>
      <Route path="/album/:id" component={ Album } />
      <Route path="/profile/edit" component={ ProfileEdit } />
      <Route path="/search" component={ Search } />
      <Route path="/favorites" component={ Favorites } />
      <Route path="/profile" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  </>
);

const mapStateToProps = (state) => ({
  loading: state.loading.counter,
});

const mapDispatchToProps = { startLoading, stopLoading };

export default connect(mapStateToProps, mapDispatchToProps)(App);
