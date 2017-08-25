import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
console.disableYellowBox = true;
export default class App extends Component {
  render() {
    return (
      <Login />
    )
  }
};