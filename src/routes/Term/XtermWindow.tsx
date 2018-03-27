import * as React from 'react';
import { Terminal } from 'xterm';
import * as attach from 'xterm/dist/addons/attach/attach';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as fullscreen from 'xterm/dist/addons/fullscreen/fullscreen';
import * as search from 'xterm/dist/addons/search/search';
import * as webLinks from 'xterm/dist/addons/webLinks/webLinks';
import * as winptyCompat from 'xterm/dist/addons/winptyCompat/winptyCompat';
import 'xterm/dist/xterm.css';
import 'xterm/dist/addons/fullscreen/fullscreen.css';

import { ipcRenderer } from 'electron';

import * as className from 'classnames';

// import { log } from '../../utils';

interface ExtendTerminal extends Terminal {
  fit?: Function;
  winptyCompatInit?: Function;
  webLinksInit?: Function;
}

function runFakeTerminal(term: ExtendTerminal, window: TerminalWindow) {
  var shellprompt = '$ ';

  // term.prompt = function () {
  //   term.write('\r\n' + shellprompt);
  // };

  term.writeln('Welcome to xterm.js');
  term.writeln(
    'This is a local terminal emulation, without a real terminal in the back-end.',
  );
  term.writeln('Type some keys and commands to play around.');
  term.writeln('');
  // term.prompt();
  term.write('\r\n' + shellprompt);

  term.on('key', function(key: string, ev: KeyboardEvent) {
    var printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
    let str = '';
    if (ev.keyCode === 13) {
      // term.prompt();
      // term.write();
      str = '\r\n' + shellprompt;
    } else if (ev.keyCode === 8) {
      // Do not delete the prompt
      // if (term.x > 2) {
      // term.write();
      str = '\b \b';
      // }
    } else if (printable) {
      str = key;
      // term.write(key);
    }
    // log(str);
    term.write(str);
    // ipcRenderer.send('xterm', str);
  });

  term.on('paste', function(data: string) {
    term.write(data);
  });
}

interface TerminalWindowProps {
  onFocusChange?: Function;
  addons?: string[];
  options?: object;
  path?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
}
export interface TerminalWindowState {
  isFocused: boolean;
}

export default class TerminalWindow extends React.Component<
  TerminalWindowProps,
  TerminalWindowState
> {
  term: ExtendTerminal;
  container: HTMLDivElement | null;
  constructor(props: TerminalWindowProps) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }
  componentDidMount() {
    Terminal.applyAddon(fit);
    Terminal.applyAddon(search);
    Terminal.applyAddon(fullscreen);
    Terminal.applyAddon(attach);
    Terminal.applyAddon(webLinks);
    Terminal.applyAddon(winptyCompat);
    this.term = new Terminal(this.props.options);
    if (this.container) {
      this.term.open(this.container);
      this.term.focus();
      if (this.term.fit) {
        this.term.fit();
      }
      if (this.term.winptyCompatInit) {
        this.term.winptyCompatInit();
      }
      if (this.term.webLinksInit) {
        this.term.webLinksInit();
      }
      runFakeTerminal(this.term, this);
      this.term.on('focus', this.focusChanged.bind(this, true));
      this.term.on('blur', this.focusChanged.bind(this, false));
      ipcRenderer.on('init-reply', (event, data) => {
        if (data.length === 1) {
          return;
        }
        this.term.write(data);
      });
      ipcRenderer.send('init-message');
      // 发送命令
      this.term.on('data', (data: string) => {
        // this.term.write(data);
        ipcRenderer.send('xterm', data);
      });
    }
  }
  componentWillUnmount() {
    this.term.destroy();
  }
  getTerminal() {
    return this.term;
  }
  write(data: string) {
    this.term.write(data);
  }
  writeln(data: string) {
    this.term.writeln(data);
  }
  focus() {
    this.term.focus();
  }
  focusChanged(focused: boolean) {
    this.setState({
      isFocused: focused,
    });
    if (this.props.onFocusChange) {
      this.props.onFocusChange(focused);
    }
  }

  resize(cols: number, rows: number) {
    this.term.resize(Math.round(cols), Math.round(rows));
  }
  setOption(key: string, value: boolean) {
    this.term.setOption(key, value);
  }
  refresh() {
    this.term.refresh(0, this.term.rows - 1);
  }

  render() {
    const terminalClassName = className(
      'ReactXTerm',
      this.state.isFocused ? 'ReactXTerm--focused' : null,
      this.props.className,
    );
    return (
      <div ref={e => (this.container = e)} className={terminalClassName} />
    );
  }
}
