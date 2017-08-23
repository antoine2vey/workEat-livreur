import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import axios from 'axios';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Distribution',
  }

  constructor(props) {
    super(props);
    const { token, decodedToken: { email, positions } } = props.navigation.state.params;

    this.state = {
      email,
      positions,
      token
    }
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <Text>{this.state.email}</Text>
        <Text>{this.state.token}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#F5FCFF',
  },
});