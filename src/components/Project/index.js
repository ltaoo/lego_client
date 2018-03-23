import * as React from 'react';
import {
    Icon,
    Divider,
    Tooltip,
} from 'antd';

import './index.css';
import Menu from './Menu';

export default function ProjectItem(props) {
  return (
    <div className="project">
      <div className="project__content">
        <div className="project__title">iceTest</div>
        <div className="project__url"><span>本地服务器：</span><a>http://10.10.71.51:4444</a></div>
        <div>调试服务运行中</div>
      </div>
      <Menu />
    </div>
  );
}
