import * as path from 'path';
import * as fs from 'fs';

import { message } from 'antd';

import * as constants from './constants';
import { log } from '../utils';

interface UpdatePayload {
  uuid: number;
  values: object;
}
interface RemovePayload {
  uuid: number;
  values: object;
}
interface SortPayload {
  dragIndex: number;
  hoverIndex: number;
}

export interface AddProjectActionType {
  type: constants.ADD_PROJECT;
  payload: ProjectType;
}

export interface RemoveProjectType {
  type: constants.REMOVE_PROJECT;
  payload: string;
}

export interface AddProjectFailActionType {
  type: constants.ADD_PROJECT_FAIL;
}

export interface AddComponentComonentType {
  type: constants.ADD_COMPONENT;
  payload: FakeComponent;
}

export interface UpdateComponent {
  type: constants.UPDATE_COMPONENT;
  payload: UpdatePayload;
}

export interface RemoveComponent {
  type: constants.REMOVE_COMPONENT;
  payload: RemovePayload;
}

export interface AppendComponent {
  type: constants.APPEND_COMPONENT;
  payload: SortPayload;
}

export interface ReplaceComponent {
  type: constants.REPLACE_INSTANCES;
}

export interface EmptyPage {
  type: constants.EMPTY_PAGE;
}

export interface Sort {
  type: constants.SORT;
  payload: SortPayload;
}

export type ProjectAction = 
  AddProjectActionType 
  | RemoveProjectType 
  | AddComponentComonentType 
  | UpdateComponent
  | RemoveComponent
  | AppendComponent
  | ReplaceComponent
  | EmptyPage
  | Sort
  ;

export function addProject(payload: string): AddProjectActionType | AddProjectFailActionType {
  const projectPath = payload;
  // 判断该文件夹下 package.json 文件是否存在
  const packagePath = path.resolve(projectPath, 'package.json');
  const exist = fs.existsSync(packagePath);
  log(projectPath, packagePath, exist);
  if (!exist) {
    message.error('该项目内没有 package.json 配置文件，请检查后重试');
    return {
      type: constants.ADD_PROJECT_FAIL,
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
  // todo: 检查是否已存在并提示
  const oldProjects = JSON.parse(localStorage.getItem('projects') || '{}');
  const newProjects = Object.assign({}, oldProjects, {
    [projectPath]: data,
  });
  localStorage.setItem('projects', JSON.stringify(newProjects));
  return {
    type: constants.ADD_PROJECT,
    payload: data,
  };
}

export function removeProject(payload: string): RemoveProjectType {
  const oldProjects = JSON.parse(localStorage.getItem('projects') || '{}');
  delete oldProjects[payload];
  localStorage.setItem('projects', JSON.stringify(oldProjects));
  return {
    type: constants.REMOVE_PROJECT,
    payload,
  };
}

export function emptyPage () {
  return {
    type: constants.EMPTY_PAGE,
  };
}
