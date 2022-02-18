import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Sagafunction from './Middleware/Sagafunction';
import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware } from 'redux';
import { encryptStorage } from './ConfigFiles/EncryptStorage';


const initialState={detailsData:[],count:encryptStorage.getItem('cart')==undefined?0:encryptStorage.getItem('cart').length}
function reducer(state=initialState,actions){
    switch(actions.type){
    case 'fetch' : localStorage.setItem("user",JSON.stringify([...state.detailsData,actions.payload]));return{detailsData:[...state.detailsData,actions.payload]}
    case 'INC'  : return{count:state.count+actions.payload}
    case 'DEC'  : return{...state,count:state.count-actions.payload}
    case 'SET'  : return{...state,count:actions.payload}
    default : return state;
  }
}
const sagaMiddleware=createSagaMiddleware();
const store=createStore(reducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(Sagafunction)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
