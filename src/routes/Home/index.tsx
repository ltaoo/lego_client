import * as React from 'react';
import { remote } from 'electron';
import { connect, Dispatch } from 'react-redux';
import { Button } from 'antd';

import withStack from '../../components/PageStack/withStack';
import Project from '../../components/Project';
import { 
  StoreState,
  ProjectType,
} from '../../types';
import * as actions from '../../store/actions';
import { log } from '../../utils';

const { dialog } = remote;

/**
 * 组件属性声明
 */
export interface Props {
  name: string;
  enthusiasmLevel?: number;
  projects: Array<ProjectType>;
  onIncrement?: (path: string) => void;
  onDecrement: (path: string) => void;
}

export class Home extends React.Component<Props, object> {
  openProject = () => {
    const {
      onIncrement,
    } = this.props;
    const file = dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    log(file);
    if (onIncrement) {
      onIncrement(file[0]);
    }
  }
  render() {
    const {
      projects,
    } = this.props;
    return (
      <div>
        <div className="layout__header">
          <Button type="primary" className="create-project">
            创建项目
          </Button>
          <Button onClick={this.openProject}>打开项目</Button>
        </div>
        <div className="projects">
          {projects.map((item: ProjectType, i: number) => (
            <Project
              key={i} 
              {...item} 
              removeProject={this.props.onDecrement}
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
export function mapStateToProps({ enthusiasmLevel, languageName, projects }: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
    projects,
  };
}
export function mapDispatchToProps(dispatch: Dispatch<actions.AddProjectActionType>) {
  return {
    onIncrement: (payload: string) => dispatch(actions.addProject(payload)),
    onDecrement: (payload: string) => dispatch(actions.removeProject(payload)),
  };
}
export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(withStack(Home));
