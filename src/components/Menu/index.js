import * as React from 'react';

import './index.css';
import Item from './Item';

export default function Menu(props) {
  const { menus } = props;
  return (
    <div className="sider__menus">
      {menus.map((menu, i) => <Item key={i} index={i} icon={menu.icon} title={menu.title} />)}
    </div>
  );
}
