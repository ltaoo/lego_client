/**
 * @file 支持自定义数量的 Input
 * @author wuya
 */
import * as React from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Icon,
  Form,
  Switch,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { Registry } from '../../types';

let uuid = 0;

export interface UserFormProps extends FormComponentProps {
  hide: boolean;
  default: Array<Registry>;
}

export interface ArrayInputStateType {
  registries: Array<Registry>;
}

export default class ArrayInput extends React.Component<UserFormProps, ArrayInputStateType> {
  constructor(props: UserFormProps) {
    super(props);

    this.state = {
      registries: props.default,
    };
  }
  remove = (k: number) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
  }

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid += 1;
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  renderItem = () => {
    return (
      <Col>
        <Input />
        <Button>点击</Button>
      </Col>
    );
  }
  renderItems = () => {
    const { form } = this.props;
    const {
      registries,
    } = this.state;
    const { getFieldDecorator } = form;
    const formItems = registries.map((item: Registry, i: number) => {
      return (
        <Form.Item
          key={i}
          label={item.alias}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          {getFieldDecorator(`accounts[${i}]`, {
            initialValue: item.registry,
          })(
            <Input placeholder="镜像地址" style={{ width: '60%', marginRight: 8 }} />
          )}
          <Switch
            checked={item.active}
          />
        </Form.Item>
      );
    });
    return formItems;
  }
  render() {
    const { hide } = this.props;
    const items = this.renderItems();
    return (
      <Form layout="horizontal">
        <Row>
          <Col span={16}>
            {!hide && <Button type="dashed" onClick={this.add}>
              <Icon type="plus" />新增镜像地址
            </Button>}
            {items}
          </Col>
        </Row>
      </Form>
    );
  }
}
