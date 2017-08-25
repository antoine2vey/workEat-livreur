import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const CommandsGrouped = ({ place, commands, isShown, toggleCommand }) => {
  const getCommandsForCurrentCity = ({ name }) => (
    commands.filter(command => command.placeToShip.name === name)
  )
  const title = getCommandsForCurrentCity(place);

  const getNumberLivredCommand = (commands) => (
    title.filter(command => command.isDistribued === true)
  )
  const livredCommands = getNumberLivredCommand(place, commands);
  return (
    <View>
      <Text style={styles.menuNumber}>
        {`${title.length} ${title.length === 1 ? 'commande' : 'commandes'}`}
        {' - '}
        {`${livredCommands.length} ${livredCommands.length > 1 ? 'livrées' : 'livrée'}`}
      </Text>
      <View style={styles.commandContainer}>
        { isShown && title.map(
          ({ _id, orderedBy, isDistribued, quantitiesById, articles, bundles, placeToShip }) => (
            <View style={styles.command} key={_id} style={{opacity: isDistribued ? 0.3 : 1 }}>
              <View style={styles.commandHeader}>
                <TouchableOpacity onPress={() => toggleCommand(_id)}>
                  <Ionicons name={isDistribued ? 'ios-checkbox' : 'ios-checkbox-outline'} size={28} color={isDistribued ? 'rgb(236,215,133)' : 'black'} />
                </TouchableOpacity>
                <Text style={styles.person}>
                  M. {orderedBy.name} {orderedBy.surname}
                </Text>
              </View>
              <View style={styles.list}>
                { articles.map(({ _id, name, price }) => (
                  <View key={_id} style={styles.listItem} >
                    <Entypo name={'dot-single'} size={18} />
                    <View style={styles.line}>
                      <Text style={styles.flexZone}>{name}</Text>
                      <Text style={styles.noFlexZone}>{`x${quantitiesById[_id]}`}</Text>
                      <Text style={styles.noFlexZone}>{`${price * quantitiesById[_id]}€`}</Text>
                    </View>
                  </View>
                )) }
                { bundles.map(({ bundle }) => (
                  <View key={_id} style={styles.listItem} >
                    <Entypo name={'dot-single'} size={18} />
                    <View style={styles.line}>
                      <Text style={styles.flexZone}>{bundle.name}</Text>
                      <Text style={styles.noFlexZone}>{`x${quantitiesById[bundle._id]}`}</Text>
                      <Text style={styles.noFlexZone}>{`${bundle.price * quantitiesById[bundle._id]}€`}</Text>
                    </View>
                  </View>
                )) }
              </View>
            </View>
          )
        )}
      </View>
    </View>
  );
}

const gold = 'rgb(236,215,133)';
const styles = StyleSheet.create({
  menuNumber: {
    color: gold,
    paddingLeft: 60,
  },
  commandContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  commandHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  person: {
    fontSize: 16,
    paddingLeft: 20,
    fontWeight: '600',
    marginTop: -4
  },
  list: {
    paddingLeft: 35
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flexZone: {
    flex: 2,
  },
  noFlexZone: {
    flex: 1,
    textAlign: 'right',
    fontWeight: '600'
  }
})

export default CommandsGrouped;
