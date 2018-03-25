import { StoreState } from '../types';
import { ProjectAction } from '../store/actions';
import { ADD_PROJECT, REMOVE_PROJECT } from '../store/constants';

export default function enthusiasm(
  state: StoreState,
  action: ProjectAction,
): StoreState {
  switch (action.type) {
    // 将已有的文件夹添加
    case ADD_PROJECT:
      return {
        ...state,
        projects: state.projects.concat([action.payload]).filter(item => !!item),
      };
    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((item) => item && (item.path !== action.payload)),
      };
    default:
      return state;
  }
}
