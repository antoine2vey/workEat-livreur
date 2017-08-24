import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CommandsGrouped from './CommandsGrouped';
import { MaterialIcons } from '@expo/vector-icons';

const Places = ({ places, commands }) => (
  <View>
    {places.map((place, i) =>
      <View key={place._id}>
        <View style={styles.placeContainer}>
          <View style={styles.indiceBorder}>
            <Text style={styles.indice}>{i + 1}</Text>
          </View>
          <Text style={styles.placeTitle}>{place.name}</Text>
          <View style={styles.plusIconContainer}>
            <MaterialIcons style={styles.plusIcon} name="add" size={30} color={'#000000'} />
          </View>
        </View>
        <CommandsGrouped place={place} commands={commands} />
      </View>
    )}
    <View style={styles.endContainer}>
      <View style={styles.endBorder}></View><Text style={styles.endText}>Fin</Text><View style={styles.endBorder}></View>
    </View>
  </View>
);

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
    resizeMode: 'contain',
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
    resizeMode: 'contain',
  }
});

export default Places;
