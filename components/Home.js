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
      decodedToken
    } = props.navigation.state.params;

    this.state = {
      email: decodedToken.email,
      positions: decodedToken.positions.map(pos => ({
        ...pos,
        isShown: false,
      })),
      token,
      flex: 1,
    };
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN} = swipeDirections;
    const { flex } = this.state;
    const isMatch = flex === 1;
    LayoutAnimation.spring();
    
    if (
      gestureName === 'SWIPE_DOWN' && flex === 0.2 ||
      gestureName === 'SWIPE_UP' && flex === 5
    ) return;

    switch (gestureName) {
      case SWIPE_UP:
        isMatch ? this.setState({ flex: 5 }) : this.setState({ flex: 1 })
        break;
      case SWIPE_DOWN:
        isMatch ? this.setState({ flex: 0.2 }) : this.setState({ flex: 1 })
        break;
    }
  }

  render() {
    const { positions, token } = this.state;

    return (
      <View style={styles.scroll}>
        <GoogleMap positions={positions} style={{ flex: 1 }} />
        <GestureRecognizer style={styles.gesture} onSwipe={(direction, state) => this.onSwipe(direction, state)}>
          <MaterialIcons name="drag-handle" size={30} color={'#e0e0e0'} />
        </GestureRecognizer>
        <View style={{ flex: this.state.flex, backgroundColor: '#fff' }}>
          <ScrollView>
            <Commands style={{ flex: 1, backgroundColor: '#fff' }} places={positions} token={token} />
          </ScrollView>
        </View>
      </View>
    );
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
