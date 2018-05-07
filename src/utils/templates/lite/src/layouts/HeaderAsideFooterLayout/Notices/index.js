/**
 * @file 消息提示
 * @author wuya@qunhemail.com
 */
import React from 'react';

import NoticeIcon from '../../../components/NoticeIcon';

export default class Notices extends React.Component {
  handleNoticeClear = () => {
    this.props.dispatch({
      type: 'common/clearNotices',
    });
  }
  /**
   * 处理消息提醒
   */
  renderNotices = () => {
    return {
      noticesCount: 0,
      notices: [],
    };
  }

  render() {
    const { notices, noticesCount } = this.renderNotices();
    return (
      <NoticeIcon
        count={noticesCount}
        onItemClick={(item) => {
          console.log(item);
        }}
        onClear={this.handleNoticeClear}
        popupAlign={{ offset: [20, -16] }}
      >
        <NoticeIcon.Tab
          list={notices}
          title="待办"
          emptyText="你已完成所有待办"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
        />
        <NoticeIcon.Tab
          list={[]}
          title="通知"
          emptyText="你已查看所有通知"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
        />
        <NoticeIcon.Tab
          list={[]}
          title="消息"
          emptyText="您已读完所有消息"
          emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        />
      </NoticeIcon>
    );
  }
}
