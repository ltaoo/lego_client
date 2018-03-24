import * as path from 'path';
import * as fs from 'fs';

import {
  message,
} from 'antd';

import { StoreState } from '../types';
import { ProjectAction } from './actions';
import { ADD_PROJECT, DECREMENT_ENTHUSIASM } from './constants';
import {
  log,
} from '../utils';

export default function enthusiasm(
  state: StoreState,
  action: ProjectAction,
): StoreState {
  switch (action.type) {
    // 将已有的文件夹添加
    case ADD_PROJECT:
      const projectPath = action.payload;
      // 判断该文件夹下 package.json 文件是否存在
      const packagePath = path.resolve(projectPath, 'package.json');
      const exist = fs.existsSync(packagePath);
      log(projectPath, packagePath, exist);
      if (exist) {
        // 解析 package.json 获取文件名、版本等信息
        const packageData = fs.readFileSync(packagePath, 'utf-8');
        const jsonData = JSON.parse(packageData);
        return {
          ...state,
          projects: state.projects.concat([{
            title: jsonData.name,
            version: jsonData.version,
            path: projectPath,
            data: jsonData,
          }]),
        };
      }
      message.error('该项目内没有 package.json 配置文件，请检查后重试');
      return { ...state };
    case DECREMENT_ENTHUSIASM:
      return {
        ...state,
        enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1),
      };
    default:
      return state;
  }
}
