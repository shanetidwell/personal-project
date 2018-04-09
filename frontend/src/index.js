import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {HashRouter,Route} from 'react-router-dom';
import Store from './store';
import {Provider} from 'react-redux';

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <HashRouter>
        <Provider store = {Store}>
            <Route component ={App}/>
        </Provider>
    </HashRouter>
, document.getElementById('root'));
// registerServiceWorker();
