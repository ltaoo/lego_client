import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown } from 'antd';

import SideMenu from './SideMenu';
import Notices from './Notices';
import styles from './index.less';

const { Content, Header, Footer, Sider } = Layout;

export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    current: 0,
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    const {
        collapsed,
    } = this.state;
    const { route } = this.props;

    const notices = [];

    const dropdownMenu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout"><Link to="/login"><Icon type="logout" />退出登录</Link></Menu.Item>
    </Menu>
    );
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <SideMenu collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className={styles.right}>
              <Notices notices={notices} />
              <Dropdown overlay={dropdownMenu}>
                <span className={`${styles.action} ${styles.account}`}>
                  <span style={{ marginRight: 20 }} className={styles.name}>wuya</span>
                </span>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {<route.indexRoute.component />}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
