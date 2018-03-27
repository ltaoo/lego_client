/**
 * 声明一些数据类型
 */

// 项目
declare interface ProjectType {
  title: string;
  version: number;
  path: string;
  data: object;
}
// 镜像源
declare interface Registry {
  alias: string;
  home: string;
  registry: string;
  active: boolean;
}

declare interface PtyProcess {
  on: Function;
}

// 虚拟的组件，最终会生成代码
declare interface FakeComponent {
  uuid: number;
}

declare interface StoreState {
  projects: object;
  instances: Array<FakeComponent>;
}

declare var prettier;
declare var hljs;
