import React, { Component } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import Places from './Places';

const URL = 'http://localhost:3001';

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
    const { places, token } = this.props;

    return (
      <View>
        <Places places={places} commands={commands} token={token} />
      </View>
    );
  }
}

export default Commands;
