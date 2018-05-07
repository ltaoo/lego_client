// import * as os from 'os';
import * as cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import {
  Icon,
  Tooltip,
  Modal,
  Tree,
  Button,
  Form,
  Input,
} from 'antd';
import * as classNames from 'classnames';
import * as detect from 'detect-port';
import * as kill from 'tree-kill';
import { shell, ipcRenderer, remote } from 'electron';
import { FormComponentProps } from 'antd/lib/form';

import './index.css';
import Operator from './Menu';
import {
  log,
} from '../../utils';

interface Nav {
  text: string;
  icon: string;
  to: string;
  children?: Nav[];
}
interface OriginRoute {
  routes: Route[];
}
interface StateType {
  createRouteModalVisible: boolean;
  currentRouteModalVisible: boolean;
  navs: Nav[];
  status: number;
  per: number;
  devUrl?: string;
  output: Buffer;
  process?: Process;
}

interface Process {
  pid: number;
  disconnect: Function;
  stdout: Object;
}

interface Props extends FormComponentProps {
  title: string;
  version: string;
  path: string;
  removeProject?: Function;
  originConfig: Object;
}

interface Route {
  name: string;
  path: string;
  icon: string;
}

function getNavs (routes: Route[] = []) {
  return (routes).map((route) => {
    return {
      text: route.name,
      to: route.path,
      icon: route.icon,
    };
  }).filter(route => !!route.icon);
}

const PROJECT_STATUS = {
  0: '未启动调试服务',
  1: '调试服务运行中',
  2: '调试服务已停止',
};

const { TreeNode } = Tree;
const { BrowserWindow } = remote;

class ProjectItem extends React.Component<Props, StateType> {
  originConfig: OriginRoute;
  constructor(props: Props) {
    super(props);

    this.state = {
      createRouteModalVisible: false,
      currentRouteModalVisible: false,
      navs: [],
      status: 0,
      per: 0,
      devUrl: undefined,
      output: new Buffer([]),
      process: undefined,
    };
  }
  test = () => {
    const {
      path: projectPath,
    } = this.props;
    const port = 3000;
    detect(port, (err, _port) => {
      if (err) {
        log(err);
      }
      if (port === _port) {
        log(`port: ${port} was not occupied`);
      } else {
        const subprocess = cp.exec(
          `PORT=${_port} yarn start`, 
          {
            cwd: projectPath,
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
        this.setState({
          status: 1,
          process: subprocess,
        });
        subprocess.stdout.on('data', (data: Buffer) => {
          log(data.toString());
          // const msg = chalk.blue(data.toString());
          // const msg = Buffer.from(data, 'utf16le');
          // this.setState({
            // output: this.state.output.concat([data]),
          // });
        });
      }
    });
  }
  startDev = () => {
    const { path: projectPath } = this.props;
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
        const cmd = cp.spawn('yarn', ['start'], {
          cwd: projectPath,
          env: Object.assign(process.env, {
            PORT: _port,
          }),
        });
        cmd.stdout.on('data', data => {
          log(data.toString());
        });

        cmd.stderr.on('data', data => {
          log(`stderr: ${data}`);
        });

        cmd.on('close', code => {
          log(`子进程退出码：${code}`);
        });
        // cp.exec(
        //   `PORT=${_port} yarn start`, 
        //   {
        //     cwd: path,
        //   }, 
        //   (error, stdout, stderr) => {
        //     if (error) {
        //       log(`exec error: ${error}`);
        //       return;
        //     }
        //     log(`stdout: ${stdout}`);
        //     log(`stderr: ${stderr}`);
        //   }
        // );
      }
    });
  }
  stop = () => {
    const {
      process,
    } = this.state;
    if (process) {
      log(process.pid);
      log(process.pid);
      kill(process.pid);
      this.setState({
        status: 0,
        process: undefined,
      });
    }
    log('stop', process);
  }

  /** 
   * 增加页面
   */
  createPage = () => {
    const {
      path: projectPath,
    } = this.props;
    // 读取 route.config.json
    fs.readFile(path.resolve(projectPath, 'src/routes/config.json'), 'utf-8', (err: Error, res: Buffer) => {
      if (err) {
        log(err);
        return;
      }
      const content = res.toString();
      try {
        this.originConfig = JSON.parse(content);
        this.setState({
          navs: getNavs(this.originConfig.routes),
          currentRouteModalVisible: true,
        });
      } catch (e) {
        log(e);
        return;
      }
    });
  }
  hideCreateRouteModal = () => {
    this.setState({
      createRouteModalVisible: false,
    });
  }
  add = (nav) => {
    log(nav);
  }
  createRoot = () => {
    this.setState({
      createRouteModalVisible: true,
      currentRouteModalVisible: false,
    });
  }
  createRoute = () => {
    const { form, path: projectPath } = this.props;
    const { getFieldValue } = form;
    const name = getFieldValue('text');
    const newPath = getFieldValue('to');
    const icon = getFieldValue('icon');
    const component = getFieldValue('component');
    const newJson = JSON.stringify(
      {
        routes: [...this.originConfig.routes,
        {
          name,
          path: newPath,
          icon,
          indexRoute: component,
          component: 'HeaderAsideFooterLayout'
        }],
      },
      null,
      '\t'
    );
    fs.writeFile(path.resolve(projectPath, 'src/routes/config.json'), newJson, 'utf-8', (err: Error) => {
      if (err) {
        return;
      }
    });
    fs.mkdir(path.join(projectPath, './src/pages/') + component, (err: Error) => {
      if (err) {
        log(err);
        return;
      }
      const win = new BrowserWindow({
        width: 800,
        height: 600,
      });
      win.loadURL(`http://127.0.0.1:3000/create/?path=${component}&project=${projectPath}`);
    });
  }
  createNode = (navs: Nav[]) => {
    return (
      navs.map(nav => (
        <TreeNode
          key={nav.to}
          icon={<Icon type={nav.icon} />}
          title={(
            <div>
              <span>{nav.text}</span>
              <span onClick={this.add.bind(this, nav)}>+</span>
            </div>
          )}
        >
          {nav.children && this.createNode(nav.children)}
        </TreeNode>
      ))
    );
  }

  removeProject = () => {
    const {
      removeProject,
    } = this.props;
    const {
      path: projectPath,
    } = this.props;
    if (removeProject) {
      removeProject(projectPath);
    }
  }
  openInTerm = () => {
    const { path: projectPath } = this.props;
    // shell.showItemInFolder(path);
    ipcRenderer.send('open-term', projectPath);
  }
  openInEditor = () => {
    const { path: projectPath } = this.props;
    // shell.showItemInFolder(path);
    ipcRenderer.send('open-editor', projectPath);
  }
  openInFolder = () => {
    const { path: projectPath } = this.props;
    shell.showItemInFolder(projectPath);
  }

  render() {
    const {
      title,
      version,
      form,
    } = this.props;
    const {
      createRouteModalVisible,
      currentRouteModalVisible,
      navs,
      status,
      devUrl,
      output,
    } = this.state;
    const { getFieldDecorator } = form;
    log(output);

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
          {status === 0 ? <Tooltip
            overlayClassName="menu__tip"
            placement="left"
            title={<span>启动调试服务</span>}
            mouseEnterDelay={2}
          >
            <div
              className="project__start"
              onClick={this.test}
            >
               <Icon type="play-circle-o" />
            </div>
          </Tooltip>
          : <Tooltip
            overlayClassName="menu__tip"
            placement="left"
            title={<span>中止服务</span>}
            mouseEnterDelay={2}
          >
            <div
              className="project__start"
              onClick={this.stop}
            >
              <Icon type="poweroff" />
            </div>
          </Tooltip>}
        </div>
        <Operator
          methods={[
            this.removeProject,
            this.createPage,
            this.openInTerm,
            this.openInEditor,
            this.openInFolder,
          ]}
        />
        <Modal
          title="当前路由"
          visible={currentRouteModalVisible}
          footer={false}
        >
          <Button type="primary" onClick={this.createRoot}>新增根页面</Button>
          <Tree
          >
            {this.createNode(navs)}
          </Tree>
        </Modal>
        <Modal
          title="新增页面"
          visible={createRouteModalVisible}
          onOk={this.createRoute}
          onCancel={this.hideCreateRouteModal}
        >
          <Form>
            <Form.Item label="路径">
              {getFieldDecorator('to', {
                initialValue: '/',
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="标题">
              {getFieldDecorator('text', {
                initialValue: 'text',
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="图标">
              {getFieldDecorator('icon', {
                initialValue: 'home',
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="组件名">
              {getFieldDecorator('component', {
                initialValue: 'Home',
              })(
                <Input />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ProjectItem);
