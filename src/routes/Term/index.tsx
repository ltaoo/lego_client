import * as React from 'react';
import { ipcRenderer } from 'electron';
// import * as pty from 'node-pty';
// import { XTerm, Terminal } from './Panel';
import XTerm from './XtermWindow';
import { ResizableBox } from 'react-resizable';
// import * as throttle from 'lodash.throttle';
import {
  log,
} from '../../utils';

interface State {}
interface Props {
  lines: Buffer;
}

export default class Main extends React.Component<Props, State> {
  xterm: XTerm | null;
  constructor(props: Props) {
    super(props);
  }
  sendMsg = () => {
    if (this.xterm) {
      runFakeTerminal(this.xterm);
    }
    ipcRenderer.send('xterm', 'ping');
    ipcRenderer.on('reply', (event, arg) => {
      log(arg); // prints "pong"
    });
  }
  componentWillReceiveProps(nextProps: Props) {
    const { lines } = this.props;
    if (this.xterm) {
      this.xterm.writeln(lines.toString());
    }
  }
  render() {
    return (
      <div className="page__content">
        <ResizableBox
          width={200}
          height={200}
          style={{
            overflow: 'hidden',
          }}
        >
          <XTerm
            ref={xterm => (this.xterm = xterm)}
            addons={['fit', 'fullscreen', 'search']}
            style={{
              overflow: 'hidden',
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          />
        </ResizableBox>
      </div>
    );
  }
}

function runFakeTerminal(xterm: XTerm) {
  var shellprompt = '$ ';

  function prompt() {
    xterm.write('\r\n' + shellprompt);
  }
  xterm.writeln('\u001b[1m\u001b[31mfoo\u001b[39m\u001b[22m');
  xterm.writeln(
    'This is a local terminal emulation, without a real terminal in the back-end.',
  );
  xterm.writeln('Type some keys and commands to play around.');
  xterm.writeln('');
  prompt();
}
