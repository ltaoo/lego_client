import { createStore } from 'redux';

import reducer from './reducer';
import { StoreState } from './types';

export default createStore<StoreState>(reducer, {
    enthusiasmLevel: 1,
    languageName: 'TypeScript',
});
