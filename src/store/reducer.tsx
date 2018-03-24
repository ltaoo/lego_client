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
      log(action.payload);
      return {
        ...state,
        projects: state.projects.concat([action.payload]),
      };
    case DECREMENT_ENTHUSIASM:
      return {
        ...state,
        enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1),
      };
    default:
      return state;
  }
}
