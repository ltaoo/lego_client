/**
 * 展示命令行输出
 */
import * as React from 'react';
// import * as ansiHTML from 'ansi-html';

import ansiHTML from '../AnsiHtml/utis';

interface OutputPropsType {
  lines: Array<Buffer>;
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

export default class Output extends React.Component<OutputPropsType, object> {
  render() {
    const { lines } = this.props;
    return (
      <div className="output">
        {lines.map((msg, i) => {
          const content = ansiHTML(msg);
          return (
            <div key={i} dangerouslySetInnerHTML={{ __html: content }} />
          );
        })}
      </div>
    );
  }
}
