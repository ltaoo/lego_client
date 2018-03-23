import * as React from 'react';
import { 
  Layout,
  Icon,
  Button,
} from 'antd';

import './index.css';
import Menu from '../components/Menu';
import FakeMenu from '../components/FakeMenu';
import Project from '../components/Project';

const menus = [
  {
    title: '项目',
    icon: <Icon type="rocket" />,
  },
  {
    title: '设置',
    icon: <Icon type="setting" />,
  },
];

export default class BasicLayout extends React.Component {
  render() {
    return (
      <div className="layout__container">
        <div className="layout__sider">
          <FakeMenu />
          <Menu menus={menus} />
        </div>
        <Layout>
          <div className="layout__header">
            <Button type="primary" className="create-project">创建项目</Button>
            <Button>打开项目</Button>
          </div>
          <div>
            <Project />
          </div>
        </Layout>
      </div>
    );
  }
}
