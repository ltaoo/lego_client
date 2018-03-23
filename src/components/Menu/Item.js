import * as React from 'react';
import classNames from 'classnames';

export default function MeunItem(props) {
  const { icon, title, index } = props;
  const cls = classNames({
      menu: true,
      'menu--active': index === 0,
  });
  return (
    <div className={cls}>
      <div className="menu__icon">{icon}</div>
      <div className="menu__title">{title}</div>
    </div>
  );
}
