import { createStore } from 'redux';

import reducer from '../reducers';
import { StoreState } from '../types';

const projects = JSON.parse(localStorage.getItem('projects') || '{}');

const initialState = {
    projects:  projects,
};

export default createStore<StoreState>(reducer, initialState);
