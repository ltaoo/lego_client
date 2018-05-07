import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

import getNavs from '../../../routes/navs';

const { Sider } = Layout;

class SideMenu extends Component {
    state = {
        navs: [],
    };
    static propTypes = {
        location: PropTypes.object.isRequired,
    };

    componentDidMount() {
        // 由于先加载这里，才获取路由配置，所以延后获取 nav
        this.setState({
            navs: getNavs(),
        });
    }

    render() {
        const { navs } = this.state;
        const { location } = this.props;
        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    selectedKeys={[location.pathname]}
                >
                    {navs.map(nav => (
                        <Menu.Item key={nav.to}>
                            <NavLink to={nav.to}>
                                <Icon type={nav.icon} />
                                <span>{nav.text}</span>
                            </NavLink>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(SideMenu);
