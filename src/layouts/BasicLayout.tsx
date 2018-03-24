import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Icon } from 'antd';

import './index.css';
import Menu from '../components/Menu';
import FakeMenu from '../components/FakeMenu';
// page
import Home from '../routes/Home/index';
import Setting from '../routes/Setting/index';

const menus = [
  {
    title: '项目',
    icon: <Icon type="rocket" />,
    link: '/',
  },
  {
    title: '设置',
    icon: <Icon type="setting" />,
    link: '/setting',
  },
];

const routes = function getRoutes() {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/setting" component={Setting} />
    </Switch>
  );
};

export default class BasicLayout extends React.Component {
  render() {
    return (
      <Router>
        <div className="layout__container">
          <div className="layout__sider">
            <FakeMenu />
            <Menu menus={menus} />
          </div>
          <Layout className="layout__content">
            {routes()}
          </Layout>
        </div>
      </Router>
    );
  }
}
