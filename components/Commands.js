import React, { Component } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import Places from './Places';

const URL = 'http://10.20.0.45:3001';

class Commands extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commands: [],
    }
  }

  componentDidMount() {
    axios.get(`${URL}/livreur/commands`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    }).then(({ data }) => {
      this.setState({
        commands: data
      })
    })
  }

  render() {
    const { commands } = this.state;
    const { places } = this.props;

    return (
      <View>
        <Places places={places} commands={commands} />
      </View>
    );
  }
}

export default Commands;
