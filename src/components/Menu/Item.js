import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import classNames from 'classnames';

export default function MeunItem(props) {
  const { icon, title, link, index } = props;
  return (
    <Route
      path={link}
      children={({ match }) => {
        console.log(match);
        const cls = classNames({
          menu: true,
          'menu__link': true,
          'menu--active': match && match.isExact,
        });
        return (
          <Link className={cls} to={link}>
            <div className="menu__icon">{icon}</div>
            <span className="menu__title">{title}</span>
          </Link>
        );
      }}
    />
  );
}
