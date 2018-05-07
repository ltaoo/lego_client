import React, { Component } from 'react';

export default class Home extends Component {
  static displayName = 'Activity-Page';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="home-page">Activity Page</div>;
  }
}
