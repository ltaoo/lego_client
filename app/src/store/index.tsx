import { createStore } from 'redux';

import reducer from '../reducers';

const projects = JSON.parse(localStorage.getItem('projects') || '{}');

const initialState = {
    projects:  projects,
    instances: [],
};

export default createStore<StoreState>(reducer, initialState);
