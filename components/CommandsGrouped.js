import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommandsGrouped = ({ place, commands }) => {
  const getCommandsForCurrentCity = ({ name }) => {
    return commands.filter(command => command.placeToShip.name === name);
  }

  return (
    <View>
      { getCommandsForCurrentCity(place).map(
        ({ _id, orderedBy, isDistribued, quantitiesById, articles, bundles, placeToShip }) => (
          <View key={_id}>
            <Ionicons name={isDistribued ? 'ios-checkbox' : 'ios-checkbox-outline'} size={28} />
            <Text>
              M. {orderedBy.name} {orderedBy.surname}
            </Text>
            <View>
              { articles.map(({ _id, name, price }) => (
                <Text key={_id}>
                  {`${name} x${quantitiesById[_id]} ${price * quantitiesById[_id]}`}
                </Text>
              )) }
            </View>
          </View>
        )
      )}
    </View>
  );
}

export default CommandsGrouped;
