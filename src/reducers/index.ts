import update from 'immutability-helper';

import { ProjectAction } from '../store/actions';
import {
    ADD_PROJECT,
    REMOVE_PROJECT,
    ADD_COMPONENT,
    UPDATE_COMPONENT,
    REMOVE_COMPONENT,
    SORT,
    // APPEND_COMPONENT,
    EMPTY_PAGE,
    // REPLACE_INSTANCES,
} from '../store/constants';
import {
  updateProps,
  removeComponent,
} from '../common/util';
// import {
//   log,
// } from '../utils';

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
    // case t.ADD_PROJECT_FAIL:
    //   return state;
    // 移除项目
    case REMOVE_PROJECT:
      const tempProject = { ...state.projects };
      delete tempProject[action.payload];
      return {
        ...state,
        projects: tempProject,
      };
    // 新增组件
    case ADD_COMPONENT:
      const { payload: FakeComponent } = action;
      return {
        ...state,
        instances: state.instances.concat([FakeComponent]),
      };
    case UPDATE_COMPONENT:
      const { uuid, values } = action.payload;
      // 递归寻找 uuid 对应的那个实例对象并更新 fieldProps 和 props
      updateProps(uuid, [...state.instances], values);
      return {
        ...state,
        instances: [...state.instances],
      };
    case REMOVE_COMPONENT:
      let temp = [...state.instances];
      removeComponent(action.payload.uuid, temp);
      return {
        ...state,
        instances: temp,
      };
    case SORT:
      const { dragIndex, hoverIndex } = action.payload;
      const dragCard = state.instances[dragIndex];
      const res = update(state, {
        instances: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      });
      return res;
    // case APPEND_COMPONENT:
    //   const { parent, remove } = action.payload;
    //   const child = { ...action.payload.item };
    //   // 找到 parent
    //   temp = [...state.instances];
    //   const parentInstance = findInstance(parent, temp);
    //   console.log(parent, instances, parentInstance);
    //   if (remove) {
    //     removeComponent(child.uuid, temp);
    //   }
    //   if (parentInstance) {
    //     parentInstance.children = parentInstance.children || [];
    //     parentInstance.children.push(child);
    //   }
    //   return {
    //     ...state,
    //     instances: temp,
    //   };
    case EMPTY_PAGE:
      return {
        ...state,
        instances: [],
      };
    // case REPLACE_INSTANCES:
    //   return {
    //     ...state,
    //     instances: action.payload,
    //   };
    default:
      return state;
  }
}
