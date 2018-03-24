import * as React from 'react';
import {
    Button,
} from 'antd';

import Project from '../../components/Project';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="layout__header">
                    <Button type="primary" className="create-project">创建项目</Button>
                    <Button>打开项目</Button>
                </div>
                <div className="projects">
                    <Project />
                </div>
            </div>
        );
    }
}