import * as React from 'react';
import { 
  Layout,
  Icon,
  Button,
} from 'antd';

import './index.css';
import Menu from '../components/Menu';

const {
  Header,
  Content,
} = Layout;

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
          <Menu menus={menus} />
        </div>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Button type="primary">创建项目</Button>
            <Button>创建项目</Button>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              content
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}
