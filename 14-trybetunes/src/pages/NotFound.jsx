import React, { Component } from 'react';

class NotFound extends Component {
  componentDidMount() {
    document.title = 'Page Not Found | TrybeTunes';
  }

  render() {
    return (<div data-testid="page-not-found"><h1>Page Not Found</h1></div>);
  }
}

export default NotFound;
