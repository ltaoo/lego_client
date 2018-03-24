import * as constants from './constants';

export interface AddProject {
    type: constants.ADD_PROJECT;
    payload: string;
}

export interface DecrementEnthusiasm {
    type: constants.DECREMENT_ENTHUSIASM;
}

export type ProjectAction = AddProject | DecrementEnthusiasm;

export function addProject(payload: string): AddProject {
    return {
        type: constants.ADD_PROJECT,
        payload,
    };
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    };
}