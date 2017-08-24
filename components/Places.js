import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CommandsGrouped from './CommandsGrouped';

const Places = ({ places, commands }) => (
  <View>
    {places.map(place =>
      <View style={styles.placeContainer} >
        <Text style={styles.placeTitle} >
          {place.name}
        </Text>
        <CommandsGrouped place={place} commands={commands} />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  placeContainer: {
    margin: 20,
  },
  placeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default Places;
