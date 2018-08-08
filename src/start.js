import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./App";
import { Provider } from 'react-redux';
import reducer from './Reducers';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import {init} from "./socket";


const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise))); //we create one unique store (redux)

let component;

if (location.pathname == "/welcome") {
    component = <Welcome />;
} else {
    init()
    component = (
        <Provider store={ store }>
            <App />
        </Provider>
    );
}


ReactDOM.render(
    component,
    document.querySelector("main")
);
