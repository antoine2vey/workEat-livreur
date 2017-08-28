import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';
import CommandsGrouped from './CommandsGrouped';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const URL = 'http://172.20.10.2:3001';

class Places extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: props.places,
      commands: [],
    }

    this.toggleCommand = this.toggleCommand.bind(this)
  }

  togglePlace(place) {
    this.setState({
      places: this.state.places.map((pos, i) => {
        if (pos._id !== place._id) {
          return pos;
        }

        return {
          ...pos,
          isShown: !this.state.places[i].isShown,
        }
      })
    });
  }

  componentWillReceiveProps({ commands }) {
    if (this.props.commands !== this.state.commands) {
      this.setState({ commands })
    }
  }

  toggleCommand(id) {
    const value = !this.state.commands.find(command => command._id === id).isDistribued;

    axios.post(`${URL}/livreur/check/${id}`, {value}, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    }).then(res => {
      console.log(res);
      this.setState({
        commands: this.state.commands.map(command => {
          if (command._id !== id) {
            return command;
          }

          return {
            ...command,
            isDistribued: value,
          };
        })
      })
    }).catch(err => console.log(err));
  }

  render() {
    const { commands, places } = this.state;

    return (
      <View>
        {places.map((place, i) =>
          <View key={place._id}>
            <View style={styles.placeContainer}>
              <View style={styles.indiceBorder}>
                <Text style={styles.indice}>{i + 1}</Text>
              </View>
              <Text style={styles.placeTitle}>{place.name}</Text>
              <TouchableHighlight underlayColor={'#fff'} style={styles.plusIconContainer} onPress={()=>this.togglePlace(place)}>
                <MaterialCommunityIcons style={styles.plusIcon} name={place.isShown ? 'minus' : 'plus'} size={30} color={'#000000'} />
              </TouchableHighlight>
            </View>
            <CommandsGrouped place={place} commands={commands} isShown={place.isShown} toggleCommand={this.toggleCommand} />
          </View>
        )}
        <View style={styles.endContainer}>
          <View style={styles.endBorder}></View><Text style={styles.endText}>Fin</Text><View style={styles.endBorder}></View>
        </View>
      </View>
    );
  }
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const black = '#000000';
const grey = '#D8D8D8';

const styles = StyleSheet.create({
  placeContainer: {
    width: width,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 0,
  },
  placeTitle: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  indiceBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderColor: black,
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  indice: {
    fontSize: 16,
    transform: [{ rotate: '-45deg' }],
    backgroundColor: 'transparent'
  },
  endContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  endBorder: {
    backgroundColor: grey,
    height: 1,
    width: 40,
  },
  endText: {
    marginLeft: 15,
    marginRight: 15,
    color: grey,
    fontSize: 16,
  },
  plusIconContainer: {
    flex: 1,
    textAlign: 'right',
  },
  plusIcon: {
    alignSelf: 'flex-end',
    flex: 1,
    width: 30,
    height: 30,
  }
});

export default Places;
