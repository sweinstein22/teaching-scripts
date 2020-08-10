import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './ReduxStore';
import {Provider} from 'react-redux';
import RoutingWrapper from './RoutingWrapper';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={darkTheme}>
    <Provider {...{store: store.getStore()}}>
      <RoutingWrapper />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
