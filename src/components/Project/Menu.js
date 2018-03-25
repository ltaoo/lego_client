import * as React from 'react';
import { Tooltip, Icon } from 'antd';

const menus = [
  {
    tip: '移除项目',
    icon: <Icon type="delete" />,
  },
  {
    tip: '更改代理 API',
    icon: <Icon type="api" />,
  },
  {
    tip: '项目构建',
    icon: <Icon type="profile" />,
  },
  {
    tip: '启动调试服务',
    icon: <Icon type="play-circle-o" />,
  },
  {
    tip: '新增页面',
    icon: <Icon type="coffee" />,
  },
  {
    tip: '在命令行中打开',
    icon: <Icon type="code-o" />,
  },
  {
    tip: '在编辑器中打开',
    icon: <Icon type="file-text" />,
  },
  {
    tip: '打开项目文件夹',
    icon: <Icon type="folder-open" />,
  },
];

export default function Menu(props) {
  return (
    <div className="project__menus">
      {menus.map((menu, i) => (
        <div key={i} className="project__menu">
          <Tooltip
            placement="top"
            title={<span>{menu.tip}</span>}
            overlayClassName="menu__tip"
          >
            <span 
              className="menu__inner"
              onClick={props.methods[i]}
            >{menu.icon}</span>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
