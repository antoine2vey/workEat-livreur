import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  LayoutAnimation,
  Dimensions
} from 'react-native';
import axios from 'axios';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import { MaterialIcons } from '@expo/vector-icons';
import GoogleMap from './GoogleMap';
import Commands from './Commands';

export default class Home extends Component {
  constructor(props) {
    super(props);
    const {
      token,
      decodedToken: { email, positions },
    } = props.navigation.state.params;

    this.state = {
      email,
      positions,
      token,
      flex: 1
    };
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    LayoutAnimation.spring();

    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ flex: 5 })
        break;
      case SWIPE_DOWN:
        this.setState({ flex: 1 })
        break;
    }
  }

  render() {
    const { positions, token } = this.state;

    return <View style={styles.scroll}>
        <GoogleMap positions={positions} style={{ flex: 1 }} />
        <GestureRecognizer style={styles.gesture} onSwipe={(direction, state) => this.onSwipe(direction, state)}>
          <MaterialIcons name="drag-handle" size={30} color={'#e0e0e0'} />
        </GestureRecognizer>
        <View style={{ flex: this.state.flex, backgroundColor: '#fff' }}>
          <ScrollView>
            <Commands style={{ flex: 1, backgroundColor: '#fff' }} token={token} places={positions} />
          </ScrollView>
        </View>
      </View>;
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#000',
  },
  gesture: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
});