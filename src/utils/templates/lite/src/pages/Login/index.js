import React, { Component } from 'react';
import { Input, Form, Icon, Button } from 'antd';

import './index.css';

class Login extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    const { validateFields } = this.props.form;
    validateFields((err, data) => {
      if (err) {
        return;
      }
      console.log(data);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-page" hideRequiredMark>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请填写用户名',
              },
            ]
          })(
            <Input 
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名" 
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码',
              },
            ]
          })(
            <Input 
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入密码" 
              type="password"
            />
          )}
        </Form.Item>
        <Button className="login-form__btn" type="primary" onClick={this.handleClick}>
          登录
        </Button>
      </Form>
    );
  }
}

export default Form.create()(Login);
