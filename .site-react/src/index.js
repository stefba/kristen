import React from 'react';
//import { render, hydrate } from 'react-dom';
import { render } from 'react-snapshot';
import { ApolloProvider } from "react-apollo";  
import aclient from "./utils/apolloClient";  
import App from './App';
import * as serviceWorker from './serviceWorker';



/*
window.snapSaveState = () => ({
  "__APOLLO_STORE__": aclient
});
console.log(aclient);
*/

render(
  <React.StrictMode>
    <ApolloProvider client={aclient}>
        <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
/*
  const rootElement = document.getElementById("root");
  if (rootElement.hasChildNodes()) {
    hydrate(
      <React.StrictMode>
        <ApolloProvider client={aclient}>
          <App />
        </ApolloProvider>
      </React.StrictMode>,
      rootElement
    )
  } else {
    render(
      <React.StrictMode>
        <ApolloProvider client={aclient}>
          <App />
        </ApolloProvider>
      </React.StrictMode>,
      rootElement
    );
  }
/*
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
