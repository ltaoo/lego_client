import * as cp from 'child_process';

import * as React from 'react';
import { Icon, Tooltip } from 'antd';
import * as classNames from 'classnames';
import * as detect from 'detect-port';

import './index.css';
import Menu from './Menu';
import { ProjectType } from '../../types';
import {
  log,
} from '../../utils';

interface StateType {
  status: number;
  per: number;
  devUrl?: string;
}

const PROJECT_STATUS = {
  0: '未启动调试服务',
  1: '调试服务运行中',
  2: '调试服务已停止',
};

export default class ProjectItem extends React.Component<ProjectType, StateType> {
  constructor(props: ProjectType) {
    super(props);

    this.state = {
      status: 0,
      per: 0,
      devUrl: undefined,
    };
  }
  startDev = () => {
    const { path } = this.props;
    let port = 3000;
    this.setState({
      status: 1,
    });
    detect(port, (err, _port) => {
      if (err) {
        log(err);
      }
    
      if (port === _port) {
        log(`port: ${port} was not occupied`);
      } else {
        log(`port: ${port} was occupied, try port: ${_port}`);
        // const cmd = cp.spawn('yarn', ['start'], {
        //   cwd: path,
        //   env: Object.assign(process.env, {
        //     PORT: _port,
        //   }),
        // });
        // cmd.stdout.on('data', data => {
        //   log(data.toString());
        // });

        // cmd.stderr.on('data', data => {
        //   log(`stderr: ${data}`);
        // });

        // cmd.on('close', code => {
        //   log(`子进程退出码：${code}`);
        // });
        cp.exec(
          `PORT=${_port} yarn start`, 
          {
            cwd: path,
          }, 
          (error, stdout, stderr) => {
            if (error) {
              log(`exec error: ${error}`);
              return;
            }
            log(`stdout: ${stdout}`);
            log(`stderr: ${stderr}`);
          }
        );
      }
    });
    
  }

  render() {
    const {
      title,
      version,
    } = this.props;
    const {
      status,
      devUrl,
    } = this.state;

    const devBarClassName = classNames({
      'project__status': true,
      'project__status--success': status === 1
    });
    return (
      <div className="project">
        <div className="project__wrapper">
          <div className="project__content">
            <span className="title__line" />
            <h3 className="project__title">{title} - <span>{version}</span></h3>
            <div className="project__dev">
              <span className={devBarClassName}>
                {PROJECT_STATUS[status]}
              </span>
              {devUrl && 
                <div className="project__url">
                  <span className="project__text--small">本地服务器：</span>
                  <a className="project__link">http://10.10.71.51:4444</a>
                  <span className="content__menu">
                    <Icon type="copy" />
                  </span>
                </div>
              }
            </div>
          </div>
          <Tooltip
            overlayClassName="menu__tip"
            placement="left"
            title={<span>启动调试服务</span>}
            mouseEnterDelay={2}
          >
            <div
              className="project__start"
              onClick={this.startDev}
            >
              {status === 0 ? <Icon type="play-circle-o" /> : <Icon type="poweroff" />}
            </div>
          </Tooltip>
        </div>
        <Menu />
      </div>
    );
  }
}
