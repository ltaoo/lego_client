import * as React from 'react';
import { remote } from 'electron';
import {
    Button,
} from 'antd';
// import invariant from 'invariant';

import Project from '../../components/Project';

const { dialog } = remote;

export default class Home extends React.Component {
    openProject = () => {
        const file = dialog.showOpenDialog({
            properties: ['openFile', 'openDirectory', 'multiSelections']
        });
        // invariant(true, file);
    }
    render() {
        return (
            <div>
                <div className="layout__header">
                    <Button type="primary" className="create-project">创建项目</Button>
                    <Button onClick={this.openProject}>打开项目</Button>
                </div>
                <div className="projects">
                    <Project />
                </div>
            </div>
        );
    }
}