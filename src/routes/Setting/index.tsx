import * as cp from 'child_process';
import * as fs from 'fs';

import * as React from 'react';
import { Card, List, Form, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import './index.css';
import ArrayInput from '../../components/ArrayInput';
import { log } from '../../utils';

export interface Props extends FormComponentProps {}
export interface Package {
  name: string;
}

const registryMap = require('../../common/registries.json');

const registryAry = Object.keys(registryMap).map(key => {
  const val = registryMap[key];
  return {
    alias: key,
    ...val,
  };
});

class Setting extends React.Component<Props, object> {
  state = {
    loading: true,
    nodeModules: [],
    nodeModulesPath: '',
    registries: registryAry,
    currentRegistry: '',
  };
  componentDidMount() {
    this.getNodeModules();
    // getCurrentRegistry((res: string) => {
    //   this.setState({
    //     registries: this.state.registries.map(item => {
    //       if (item.registry === res) {
    //         return Object.assign(item, {
    //           active: true,
    //         });
    //       }
    //       return item;
    //     }),
    //     currentRegistry: res,
    //   });
    // });
  }

  /**
   * 获取全局依赖
   */
  getNodeModules = () => {
    const cmd = cp.spawn('npm', ['root', '-g']);
    cmd.stdout.on('data', data => {
      const nodeModulesPath = data.toString().trim();
      // 直接查看该文件夹下的所有文件夹，就是依赖了
      fs.readdir(nodeModulesPath, (err, res) => {
        if (err) {
          log(err);
          return;
        }
        this.setState({
          loading: false,
          nodeModulesPath,
          nodeModules: res.map((item, i) => ({ name: item, key: i })),
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
  addRegister = () => {
    const { form } = this.props;
    log(form);
  }
  render() {
    const {
      loading,
      nodeModulesPath,
      nodeModules,
      registries,
    } = this.state;
    const { form } = this.props;
    return (
      <div className="page__content">
        <Card title="Npm" style={{ marginBottom: 20 }}>
          <p>
            <span className="setting__label">node_nodules路径：</span>
            {nodeModulesPath}
          </p>
        </Card>
        <Card
          style={{ marginBottom: 20 }}
          title="全局依赖"
          extra={(
            <span onClick={this.addRegister}>
              <Icon type="file-add" />
            </span>
          )}
        >
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={nodeModules}
            renderItem={(item: Package) => (
              <List.Item
                actions={[<a key={0}>update</a>, <a key={1}>delete</a>]}
              >
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.name}</a>}
                />
              </List.Item>
            )}
          />
        </Card>
        <Card
          title="切换镜像"
          extra={(
            <span className="card__btn" onClick={this.addRegister}>
              <Icon type="file-add" />
            </span>
          )}
        >
          <ArrayInput
            form={form}
            hide={true}
            default={registries}
          />
        </Card>
      </div>
    );
  }
}

export default Form.create()(Setting);
