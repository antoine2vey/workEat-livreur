import React, { Component } from 'react';
import axios from 'axios';
import { ScrollView, View, Text } from 'react-native';
import Places from './Places';

const URL = 'http://192.168.1.47:3001';

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
      <ScrollView>
        <Places places={places} commands={commands} />
      </ScrollView>
    );
  }
}

export default Commands;
