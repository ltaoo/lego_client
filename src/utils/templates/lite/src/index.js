import ReactDOM from 'react-dom';

import './index.css';
import RouterComponent from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(RouterComponent, document.getElementById('root'));
registerServiceWorker();
