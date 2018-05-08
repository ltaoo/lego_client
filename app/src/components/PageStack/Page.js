import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

// 首先定义transition
const Slide = ({ children, ...props }) => (
  <CSSTransition classNames={'slide'} {...props}>
    {children}
  </CSSTransition>
);

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  // 通过context传递refPage
  getChildContext() {
    return {
      refPage: c => {
        this.page = c;
      },
    };
  }
  componentDidEnter = () => {
    if (this.props.onEntered) {
      this.props.onEntered(this);
    }
    if (this.page && this.page.componentDidEnter) {
      this.page.componentDidEnter();
    }
  };

  // 其他的hook也进行相同处理
  componentDidExit = () => {
    if (this.props.onExited) {
      this.props.onExited(this);
    }
    if (this.page && this.page.componentDidExit) {
      this.page.componentDidExit();
    }
  };
  componentDidTop = () => {
    if (this.props.onEntered) {
      this.props.onEntered(this);
    }
    if (this.page && this.page.componentDidTop) {
      this.page.componentDidTop();
    }
  };
  componentDidHide = () => {
    if (this.props.onEntered) {
      this.props.onEntered(this);
    }
    if (this.page && this.page.componentDidHide) {
      this.page.componentDidHide();
    }
  };
  render() {
    const props = this.props;
    return (
      <Slide
        {...props}
        onEntered={this.componentDidEnter}
        onExited={this.componentDidExit}
      >
        {props.children}
      </Slide>
    );
  }
}

Page.childContextTypes = {
  refPage: PropTypes.func,
};
