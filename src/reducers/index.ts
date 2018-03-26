import { StoreState } from '../types';
import { ProjectAction } from '../store/actions';
import { ADD_PROJECT, REMOVE_PROJECT, ADD_PROJECT_FAIL } from '../store/constants';

export default function enthusiasm(
  state: StoreState,
  action: ProjectAction,
): StoreState {
  switch (action.type) {
    // 将已有的文件夹添加
    case ADD_PROJECT:
      return {
        ...state,
        projects: {
            ...state.projects,
            [action.payload.path]: action.payload,
        },
      };
    // 添加项目失败
    case ADD_PROJECT_FAIL:
      return state;
    // 移除项目
    case REMOVE_PROJECT:
      const tempProject = {...state.projects};
      delete tempProject[action.payload];
      return {
        ...state,
        projects: tempProject,
      };
    default:
      return state;
  }
}
