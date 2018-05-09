import * as fs from 'fs';
import * as path from 'path';

import * as React from 'react';
import { remote } from 'electron';
import { connect, Dispatch } from 'react-redux';
import { Button, Modal } from 'antd';

import withStack from '../../components/PageStack/withStack';
import Project from '../../components/Project';
import * as actions from '../../store/actions';
import { log, createProject } from '../../utils';

const { dialog, BrowserWindow } = remote;

/**
 * 组件属性声明
 */
export interface Props {
  name: string;
  enthusiasmLevel?: number;
  projects: object;
  addProject?: (path: string) => void;
  removeProject: (path: string) => void;
}

export class Home extends React.Component<Props, object> {
  /** 
   * 新增项目弹窗
   */
  createProject = () => {
    const {
      addProject,
    } = this.props;
    const file = dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory'],
    });
    log(file);
    if (!file) {
      return;
    }
    // 检查是否为空目录
    fs.readdir(file[0], (err, files) => {
      if (err) {
        log(err);
        return;
      }
      const count = files.length;
      if (count !== 0) {
        Modal.error({
          content: '请选择空目录',
        });
        return;
      }
      // create project
      createProject(file[0], 1)
        .then((res) => {
          Modal.success({
            content: '创建成功'
          });
          if (addProject) {
            addProject(file[0]);
          }
        })
        .catch((e) => {
          log(e);
        });
    });
  }
  /**
   * 选择项目弹窗
   */
  openProject = () => {
    const {
      addProject,
    } = this.props;
    const file = dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    log(file);
    if (addProject && file && file[0]) {
      addProject(file[0]);
    }
  }
  test = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
    });
    // win.loadURL(`/build/index.html#/create/?path=${component}&project=${projectPath}`);
    log(path.resolve('./', 'build/index.html'), __dirname, path.resolve('./'), path.dirname('./'));
    win.loadURL(`file://${path.resolve(__dirname, '/public/index.html')}`);
    win.once('ready-to-show', () => {
      win.show();
    });
  }
  render() {
    const {
      projects,
    } = this.props;
    return (
      <div>
        <div className="layout__header">
          <Button type="primary" className="create-project" onClick={this.createProject}>
            创建项目
          </Button>
          <Button onClick={this.openProject}>打开项目</Button>
          <Button onClick={this.test}>测试1</Button>
        </div>
        <div className="projects">
          {Object.keys(projects).map((key: string, i: number) => (
            <Project
              key={i} 
              {...projects[key]} 
              removeProject={this.props.removeProject}
            />
          ))}
        </div>
      </div>
    );
  }
}

/**
 * 将 store 中的数据映射到 component props 上
 * @param param0 
 */
export function mapStateToProps({ projects }: StoreState) {
  return {
    projects,
  };
}
export function mapDispatchToProps(dispatch: Dispatch<actions.AddProjectActionType>) {
  return {
    addProject: (payload: string) => dispatch(actions.addProject(payload)),
    removeProject: (payload: string) => dispatch(actions.removeProject(payload)),
  };
}
export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(withStack(Home));
