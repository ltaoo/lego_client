import * as cp from 'child_process';
import * as fs from 'fs';

import * as React from 'react';
import { Button, Card } from 'antd';

import { log } from '../../utils';

export default class Home extends React.Component<object, object> {
  state = {
    nodeModules: '',
  };
  componentDidMount() {
    const cmd = cp.spawn('npm', ['root', '-g']);
    cmd.stdout.on('data', data => {
      const nodeModules = data.toString().trim();
      // 直接查看该文件夹下的所有文件夹，就是依赖了
      fs.readdir(nodeModules, (err, res) => {
        if (err) {
          log(err);
          return;
        }
        log(res);
        this.setState({
          nodeModules: nodeModules,
        });
      });
    });

    cmd.stderr.on('data', data => {
      log(`stderr: ${data}`);
    });

    cmd.on('close', code => {
      log(`子进程退出码：${code}`);
    });
  }
  render() {
    const { nodeModules } = this.state;
    return (
      <div className="page__content">
        <Card title="Npm" style={{ marginBottom: 20 }}>
          <p>
            <span className="setting__label">node_nodules路径：</span>
            {nodeModules}
          </p>
        </Card>
        <Card title="全局依赖" style={{ marginBottom: 20 }}>
          <p>
            <span className="setting__label">node_nodules路径：</span>
            {nodeModules}
          </p>
        </Card>
        <Button type="primary">保存</Button>
      </div>
    );
  }
}
