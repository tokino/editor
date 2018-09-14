import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {TextArea} from './component/TextArea';

import {createStore} from 'redux';
import '../stylus/style.styl';
import {EditorReducer} from './reducers';

const store = createStore(EditorReducer);

ReactDOM.render(
    <Provider store={store}>
        <TextArea/>
    </Provider>,
    document.querySelector('#app'),
);