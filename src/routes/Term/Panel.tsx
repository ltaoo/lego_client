import * as React from 'react';
import { Terminal } from 'xterm';
const className = require('classnames');
// const debounce = require('lodash.debounce');
// import styles from 'xterm/xterm.css';
// require ('xterm/xterm.css');

interface XtermProps {
  onFocusChange?: Function;
  addons?: string[];
  options?: object;
  path?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
}
export interface XtermState {
  isFocused: boolean;
}

export default class XTerm extends React.Component<XtermProps, XtermState> {
  xterm: Terminal | null;
  container: HTMLDivElement | null;
  fit: Function;
  constructor(props: XtermProps) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  applyAddon(addon: object) {
    Terminal.applyAddon(addon);
  }
  componentDidMount() {
    this.xterm = new Terminal(this.props.options);
    if (this.container) {
      this.xterm.open(this.container);
      this.xterm.on('focus', this.focusChanged.bind(this, true));
      this.xterm.on('blur', this.focusChanged.bind(this, false));
      if (this.props.value) {
        this.xterm.write(this.props.value);
      }
    }
  }
  componentWillUnmount() {
    // is there a lighter-weight way to remove the cm instance?
    if (this.xterm) {
      this.xterm.destroy();
      this.xterm = null;
    }
  }
  // componentWillReceiveProps: debounce(function (nextProps) {
  // 	if (typeof nextProps.options === 'object') {
  // 		// for (let optionName in nextProps.options) {
  // 		// 	if (nextProps.options.hasOwnProperty(optionName)) {
  // 		// 		this.xterm.setOption(optionName, nextProps.options[optionName]);
  // 		// 	}
  // 		// }
  // 	}
  // }, 0),
  getTerminal() {
    return this.xterm;
  }
  write(data: string) {
    if (this.xterm) {
      this.xterm.write(data);
    }
  }
  writeln(data: string) {
    if (this.xterm) {
      this.xterm.writeln(data);
    }
  }
  focus() {
    if (this.xterm) {
      this.xterm.focus();
    }
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
    if (this.xterm) {
      this.xterm.resize(Math.round(cols), Math.round(rows));
    }
  }
  setOption(key: string, value: boolean) {
    if (this.xterm) {
      this.xterm.setOption(key, value);
    }
  }
  refresh() {
    if (this.xterm) {
      this.xterm.refresh(0, this.xterm.rows - 1);
    }
  }

  render() {
    const terminalClassName = className(
      'ReactXTerm',
      this.state.isFocused ? 'ReactXTerm--focused' : null,
      this.props.className,
    );
    return <div ref={(e) => this.container = e} className={terminalClassName} />;
  }
}
export { Terminal, XTerm };
