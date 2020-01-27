/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import Navigation from './src/navigator';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import Store from './src/redux/store';

const store = Store();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}