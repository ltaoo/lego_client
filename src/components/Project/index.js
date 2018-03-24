import * as React from 'react';
import { Icon, Divider, Tooltip } from 'antd';

import './index.css';
import Menu from './Menu';
import { ProjectType } from '../../types';

export default class ProjectItem extends React.Component<ProjectType, object> {
  render() {
    const {
      title,
      version,
    } = this.props;
    return (
      <div className="project">
        <div className="project__wrapper">
          <div className="project__content">
            <span className="title__line" />
            <h3 className="project__title">{title} - <span>{version}</span></h3>
            <div className="project__url">
              <span className="project__text--small">本地服务器：</span>
              <a className="project__link">http://10.10.71.51:4444</a>
              <span className="content__menu">
                <Icon type="copy" />
              </span>
              <span className="content__menu">
                <Icon type="global" />
              </span>
            </div>
            <span className="project__status project__status--success">
              调试服务运行中
            </span>
          </div>
          <Tooltip
            overlayClassName="menu__tip"
            placement="left"
            title={<span>启动调试服务</span>}
            mouseEnterDelay={2}
          >
            <div className="project__start">
              <Icon type="play-circle-o" />
            </div>
          </Tooltip>
        </div>
        <Menu />
      </div>
    );
  }
}
