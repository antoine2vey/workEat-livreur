import React from 'react';
import { View, Text } from 'react-native';
import CommandsGrouped from './CommandsGrouped';

const Places = ({ places, commands }) => (
  <View>
    {places.map(place =>
      <View>
        <Text>
          {place.name}
        </Text>

        <CommandsGrouped place={place} commands={commands} />
      </View>
    )}
  </View>
);

export default Places;