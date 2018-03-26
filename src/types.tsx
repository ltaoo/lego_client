/**
 * 声明一些数据类型
 */

// 项目
export interface ProjectType {
  title: string;
  version: number;
  path: string;
  data: object;
}
// 镜像源
export interface Registry {
  alias: string;
  home: string;
  registry: string;
  active: boolean;
}

export interface PtyProcess {
  on: Function;
}

export interface StoreState {
  projects: object;
}
