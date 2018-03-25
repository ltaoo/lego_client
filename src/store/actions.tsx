import * as path from 'path';
import * as fs from 'fs';

import { message } from 'antd';

import { ProjectType } from '../types';
import * as constants from './constants';
import { log } from '../utils';

export interface AddProjectActionType {
  type: constants.ADD_PROJECT;
  payload?: ProjectType;
}

export interface RemoveProjectType {
  type: constants.REMOVE_PROJECT;
  payload: string;
}

export type ProjectAction = AddProjectActionType | RemoveProjectType;

export function addProject(payload: string): AddProjectActionType {
  const projectPath = payload;
  // 判断该文件夹下 package.json 文件是否存在
  const packagePath = path.resolve(projectPath, 'package.json');
  const exist = fs.existsSync(packagePath);
  log(projectPath, packagePath, exist);
  if (!exist) {
    message.error('该项目内没有 package.json 配置文件，请检查后重试');
    return {
      type: constants.ADD_PROJECT,
    };
  }
  // 解析 package.json 获取文件名、版本等信息
  const packageData = fs.readFileSync(packagePath, 'utf-8');
  const jsonData = JSON.parse(packageData);
  const data = {
    title: jsonData.name,
    version: jsonData.version,
    path: projectPath,
    data: jsonData,
  };
  return {
    type: constants.ADD_PROJECT,
    payload: data,
  };
}

export function removeProject(payload: string): RemoveProjectType {
  return {
    type: constants.REMOVE_PROJECT,
    payload,
  };
}
