import React, { Component } from 'react';
import { View, Text } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from '../mapStyle.json';

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: props.positions.map(place => {
        return {
          ...place,
          geolocation: {
            latitude: place.geolocation[0],
            longitude: place.geolocation[1],
          }
        }
      })
    }
  }

  render() {
    const { places } = this.state;

    return (
      <MapView
        style={{ flex: 1, height: 500 }}
        initialRegion={{
          latitude: places[0].geolocation.latitude,
          longitude: places[0].geolocation.longitude,
          latitudeDelta: 0.3922,
          longitudeDelta: 0.3421,
        }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
      >
        {places.map(place => (
          <MapView.Marker
            key={place._id}
            coordinate={place.geolocation}
            title={place.name}
            description={place.description}
            pinColor={'#ffffe5'}
          />
        ))}
      </MapView>
    )
  }
}

export default GoogleMap;