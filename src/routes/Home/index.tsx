import * as React from 'react';
import { remote } from 'electron';
import { connect, Dispatch } from 'react-redux';
import { Button } from 'antd';

import Project from '../../components/Project';
import { StoreState } from '../../store/types';
import * as actions from '../../store/actions';
import { log } from '../../utils';

const { dialog } = remote;

export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export class Home extends React.Component<Props, object> {
  openProject = () => {
    const file = dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    log(file);
  }
  render() {
    return (
      <div>
        <div className="layout__header">
          <Button type="primary" className="create-project">
            创建项目
          </Button>
          <Button onClick={this.openProject}>打开项目</Button>
        </div>
        <div className="projects">
          <Project />
        </div>
      </div>
    );
  }
}

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  };
}
export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  };
}
export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);
