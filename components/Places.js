import React from 'react';
import { View, Text } from 'react-native';
import CommandsGrouped from './CommandsGrouped';

const Places = (props, { name }) => (
  <View>
    {props.places.map(place =>
      <View>
        <Text>
          {place.name}
        </Text>

        <CommandsGrouped place={place} commands={props.commands} />
      </View>
    )}
  </View>
);

export default Places;