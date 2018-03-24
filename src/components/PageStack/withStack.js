import React from 'react';
import PropTypes from 'prop-types';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement(
      this.props.component,
      Object.assign({}, this.props, {
        ref: this.context.refPage,
      }),
    );
  }
}

Wrapper.contextTypes = {
  refPage: PropTypes.func,
};

// withStack就是把context中的refPage进行接力
export default function withStack(Component) {
  return props => {
    return <Wrapper component={Component} {...props} />;
  };
}
