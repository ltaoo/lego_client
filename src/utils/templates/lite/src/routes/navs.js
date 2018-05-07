import { routes } from './index';

const customAsideNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',
  },
  {
    text: '用户管理',
    to: '/user',
    icon: 'user',
  },
  {
    text: '系统设置',
    to: '/setting',
    icon: 'setting',
    children: [
      {
        text: '基本设置',
        to: '/base',
      },
      {
        text: '评论设置',
        to: '/comment',
      },
    ],
  },
];
// 从 index.js 中提取 nav
export default function getNavs () {
  return (routes || []).map((route) => {
    return {
      text: route.name,
      to: route.path,
      icon: route.icon,
    };
  }).filter(route => !!route.icon);
}
