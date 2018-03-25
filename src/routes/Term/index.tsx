/**
 * 展示命令行输出
 */
import * as React from 'react';
import * as className from 'classnames';
import { Terminal } from 'xterm';
// import * as fit from 'xterm/lib/addons/fit/fit';
// import * as ansiHTML from 'ansi-html';

// import ansiHTML from '../AnsiHtml/utis';
import {
  log,
} from '../../utils';

interface TermPropsType {
  lines: Buffer;
}

// const colors = {
//   reset: ['transparent', 'transparent'],
//   black: '181818',
//   red: 'E36049',
//   green: 'B3CB74',
//   yellow: 'FFD080',
//   blue: '7CAFC2',
//   magenta: '7FACCA',
//   cyan: 'C3C2EF',
//   lightgrey: 'EBE7E3',
//   darkgrey: '6D7891',
// };

export default class Output extends React.Component<TermPropsType, object> {
  term: Terminal;
  container: HTMLDivElement | null;
  componentDidMount() {
    this.term = new Terminal();
    if (this.container) {
      this.term.open(this.container);
      const str = `Hello from \033[1;3;31mxterm.js\033[0m $ `;
      this.term.write('hello world ' + str);
    }
  }
  componentWillReceiveProps(nextProps: TermPropsType) {
    const { lines } = nextProps;
    log('new data');
    this.term.write(lines.toString());
  }
  render() {
    // const { lines } = this.props;
    const terminalClassName = className('output', 'ReactXTerm');
    return (
      <div className={terminalClassName} ref={e => (this.container = e)} />
    );
  }
}
