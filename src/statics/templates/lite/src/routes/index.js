/**
 * 定义应用路由
 */
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import config from './config.json';
import dynamic from '../utils';
import HeaderAsideFooterLayout from '../layouts/HeaderAsideFooterLayout';
import UserLayout from '../layouts/UserLayout';

const LAYOUTS = {
  HeaderAsideFooterLayout,
  UserLayout,
}
const {
  BrowserRouter: Router,
  Route,
  Switch,
} = ReactRouterDOM;
// 路由配置规则参考： https://github.com/ReactTraining/react-router/blob/v3/docs/guides/RouteConfiguration.md#configuration-with-plain-routes
// 一下部分是由 ICE 相关工具自动生成的路由，请勿随意改变，否则可能会出现一些异常情况
// <!-- auto generated routes start -->
const autoGeneratedRoutes = config.routes.map(item => {
  return {
    path: item.path,
    name: item.name,
    icon: item.icon,
    exact: item.exact,
    component: LAYOUTS[item.component],
    indexRoute: {
      component: dynamic({
        component: () => import('../pages/' + item.indexRoute),
      }),
    },
  };
}).concat([{
  path: '*',
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: dynamic({
      component: () => import('../pages/NotFound'),
    }),
  },
}]);
// const autoGeneratedRoutes = [{
//   path: '/',
//   name: '首页',
//   icon: 'home',
//   exact: true,
//   childRoutes: [],
//   component: HeaderAsideFooterLayout,
//   indexRoute: {
//     component: dynamic({
//       component: () => import('../pages/Home'),
//     }),
//   },
// }, {
//   path: '/login',
//   name: '登录',
//   component: UserLayout,
//   indexRoute: {
//     component: dynamic({
//       component: () => import('../pages/Login'),
//     }),
//   },
// }, {
//   path: '/activity',
//   name: '活动报名',
//   icon: 'calendar',
//   component: HeaderAsideFooterLayout,
//   indexRoute: {
//     component: dynamic({
//       component: () => import('../pages/Activity'),
//     }),
//   },
// }, {
//   path: '*',
//   component: HeaderAsideFooterLayout,
//   indexRoute: {
//     component: dynamic({
//       component: () => import('../pages/NotFound'),
//     }),
//   },
// }];
// <!-- auto generated routes end -->

// 自定义路由，如果 path 相同则会覆盖自动生成部分的路由配置
const customRoutes = [];

const routeData = [...autoGeneratedRoutes, ...customRoutes];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => {
  return (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} route={route} />
      )}
    />
  );
};

export const routes = routeData;

export default (
  <Router>
    <Switch>
      {routeData.map(RouteWithSubRoutes)}
    </Switch>
  </Router>
);