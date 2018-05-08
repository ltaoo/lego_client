import React from 'react';
import { withRouter } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';

import Page from './Page';

class PageStack extends React.Component {
  constructor(props) {
    super(props);
    const page = this.getPage(props.location);
    this.state = {
      stacks: [page],
    };
  }
  componentStacks = [];
  /** 
   * 生成页面
   */
  getPage = location => {
    return (
      <Page
        onEnter={this.onEnter}
        onEntering={this.onEntering}
        onEntered={this.onEntered}
        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}
      >
        {React.createElement(this.props.appRoute, {
          location,
        })}
      </Page>
    );
  };
  componentWillReceiveProps(nextProps) {
    const { action } = nextProps.history;
    console.log(this.props.location, action);
    // 后退
    if (action === 'POP' || action === 'REPLACE') {
      this.state.stacks.pop();
      return;
    }
    const newStacks = this.state.stacks.concat([this.getPage(nextProps.location)]);
    console.log(newStacks);
    this.setState({
      stacks: newStacks,
    });
  }
  onEntered = component => {
    this.componentStacks.push(component);
    const prevTopComponent = this.componentStacks[
      this.componentStacks.length - 2
    ];
    if (prevTopComponent && prevTopComponent.comopnentDidHide) {
      prevTopComponent.comopnentDidHide();
    }
  };
  onExited = component => {
    this.componentStacks.splice(this.componentStacks.indexOf(component), 1);
    const topComponent = this.componentStacks[this.componentStacks.length - 1];
    if (topComponent && topComponent.comopnentDidTop) {
      topComponent.comopnentDidTop();
    }
  };
  render() {
    return <TransitionGroup>{this.state.stacks}</TransitionGroup>;
  }
}

export default withRouter(PageStack);
