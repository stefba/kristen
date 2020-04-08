import React from 'react';
//import { render, hydrate } from 'react-dom';
import ReactDOM from 'react-dom'
import { ApolloProvider } from "react-apollo";  
import aclient from "./utils/apolloClient";  
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactDOMServer from 'react-dom/server';


ReactDOM.hydrate(
  <React.StrictMode>
    <ApolloProvider client={aclient}>
        <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
