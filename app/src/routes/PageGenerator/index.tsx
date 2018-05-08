import * as fs from 'fs';
import * as path from 'path';

import { remote } from 'electron';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import qs from 'qs';
import { Layout, Button, Form, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { connect, Dispatch } from 'react-redux';

import Sources from '../../components/Sources';
import Container from '../../components/Container';

import * as actions from '../../store/actions';
// util
import createSourceCode from '../../common/create-source';
import createPageCode from '../../common/create-page';
import createZip from '../../common/create-zip';
import renderComponent from '../../common/renderComponent';
import {
  log,
} from '../../utils';
// import { createInstances } from '../../common/util';
import './index.css';

const { Header, Content, Footer, Sider } = Layout;
const { BrowserWindow } = remote;

interface GeneratorPageProps extends FormComponentProps {
  instances: Array<FakeComponent>;
  emptyPage: Function;
}
interface GeneratorPageState {
  codeVisible: boolean;
  previewModalVisible: boolean;
  code: string;
}

class Generator extends React.Component<GeneratorPageProps, GeneratorPageState> {
  codeCon: HTMLElement;
  constructor(props: GeneratorPageProps) {
    super(props);
    this.state = {
      codeVisible: false,
      previewModalVisible: false,
      code: '',
    };
  }
  /**
   * 预览组件
   */
  preview = () => {
    this.setState({
      previewModalVisible: true,
    });
  }
  hidePreviewModal = () => {
    this.setState({
      previewModalVisible: false,
    });
  }
  /**
   * 生成格式化页面代码
   */
  createCode = () => {
    const { instances } = this.props;
    const code = createSourceCode(instances);
    const pageCode = createPageCode(instances, code, 'Index');
    // return pageCode;
    const formatedCode = prettier.format(pageCode);
    return formatedCode;
  }
  /**
   * 预览源代码
   */
  previewSource = () => {
    this.showCodeModal(() => {
      const code = this.createCode();
      this.setState(
        {
          code: code,
        },
        () => {
          const codeContainer = findDOMNode(this.codeCon);
          hljs.highlightBlock(codeContainer);
        },
      );
    });
  }
  /**
   * 下载单个文件
   */
  createPage = () => {
    const code = this.createCode();
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    log(qs.parse(location.search, { ignoreQueryPrefix: true }), code, fs);
    // const { getFieldValue } = this.props.form;
    // const fileName = getFieldValue('file');
    fs.writeFile(path.join(search.project, 'src/pages', search.path, 'index.js'), code, (err: Error) => {
      if (err) {
        log(err);
        return;
      }
      const currentWin = BrowserWindow.getFocusedWindow();
      currentWin.close();
    });
  }
  showCodeModal = cb => {
    this.setState(
      {
        codeVisible: true,
      },
      cb,
    );
  }
  hideCodeModal = () => {
    this.setState({
      codeVisible: false,
    });
  }
  /**
   * 生成 Zip 包
   */
  createZip = () => {
    const pageCode = this.createCode();
    createZip(pageCode);
  }
  /**
   * 清空所有组件
   */
  emptyCompnents = () => {
    this.props.emptyPage();
  }

  render() {
    const {
      codeVisible,
      previewModalVisible,
      code,
    } = this.state;
    const { instances } = this.props;
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider>
          <Sources {...this.props} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', paddingLeft: 24 }}>
            <Button
              type="primary"
              style={{ marginLeft: 20 }}
              onClick={this.previewSource}
            >
              查看源码
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: 20 }}
              onClick={this.preview}
            >
              预览
            </Button>
            <Button
              style={{ marginLeft: 20 }}
              type="primary"
              onClick={this.createPage}
            >
              生成文件
            </Button>
            <Button style={{ marginLeft: 20 }} onClick={this.emptyCompnents}>
              清空页面
            </Button>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff' }}>
              <Container {...this.props} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Created by KUJIALE</Footer>
        </Layout>
        <Modal
          title="查看代码"
          width="80%"
          visible={codeVisible}
          onOk={this.hideCodeModal}
          onCancel={this.hideCodeModal}
          footer={null}
        >
          <div>
            <pre>
              <code ref={e => {if (e) {this.codeCon = e; } }} className="jsx">
                {code}
              </code>
            </pre>
          </div>
        </Modal>
        <Modal
          visible={previewModalVisible}
          onOk={this.hidePreviewModal}
          onCancel={this.hidePreviewModal}
          closable={false}
          footer={null}
          width="90%"
        >
          {previewModalVisible && renderComponent(instances, this.props)}
        </Modal>
      </Layout>
    );
  }
}

export function mapStateToProps({ instances }: StoreState) {
  return {
    instances,
  };
}
export function mapDispatchToProps(
  dispatch: Dispatch<actions.AddProjectActionType>,
) {
  return {
    emptyPage: () => dispatch(actions.emptyPage()),
    removeProject: (payload: string) =>
      dispatch(actions.removeProject(payload)),
  };
}
export function mergeProps(
  stateProps: Object,
  dispatchProps: Object,
  ownProps: Object,
) {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export default DragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    Form.create()(Generator),
  ),
);
