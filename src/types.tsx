/**
 * 声明一些数据类型
 */

export interface ProjectType {
  title: string;
  version: number;
  path: string;
  data: object;
}

export interface StoreState {
  languageName: string;
  enthusiasmLevel: number;
  projects: Array<ProjectType | undefined>;
}
