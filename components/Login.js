import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Form, Icon, Separator, InputField } from 'react-native-form-generator';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ProductList from './ProductList';

const URL = 'http://localhost:3001';

class Login extends Component {
  static navigationOptions = {
    title: 'Connexion',
  };

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  componentDidMount() {}

  handleFormChange(e) {
    const disabled = e.email && e.password ? false : true;
    this.setState({
      email: e.email || '',
      password: e.password || '',
      disabled,
    });
  }

  connect() {
    const { email, password } = this.state;
    axios
      .post(`${URL}/livreur/login`, { email, password })
      .then(res => {
        const token = jwtDecode(res.data);
        this.props.navigation.navigate('Products');
      })
      .catch(err => {
        Alert.alert('Erreur', 'Mauvais identifiants')
      });
  }

  render() {
    return (
      <ScrollView style={form.scroll}>
        <Form
          ref="registrationForm"
          label="Personal Information"
          onChange={this.handleFormChange.bind(this)}
          style={form.form}
        >
          <Image source={require('../pizza.png')} style={form.logo} />
          <Text style={form.text}>
            WorkEat
            <Text
              style={{
                fontWeight: '200',
              }}
            >
              {' '}- Espace livreur
            </Text>
          </Text>
          <InputField
            placeholder="email@gmail.com"
            ref="email"
            value={this.state.email}
            autoCapitalize="none"
            keyboardType="email-address"
            style={form.input}
          />
          <InputField
            placeholder="mot de passe"
            secureTextEntry={true}
            ref="password"
            value={this.state.password}
            autoCapitalize="none"
            keyboardType="default"
            style={form.input}
          />
          <TouchableOpacity
            disabled={this.state.disabled}
            onPress={this.connect.bind(this)}
            style={form.button}>
            <Text style={form.textButton}>{'Se connecter'.toUpperCase()}</Text>
          </TouchableOpacity>
        </Form>
      </ScrollView>
    );
  }
}

export default StackNavigator({
  Home: {
    screen: Login,
  },
  Products: {
    screen: ProductList
  }
});

const form = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: 90,
    height: 100,
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    padding: 5,
    margin: 10,
    flex: 1,
  },
  input: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    alignItems: 'center',
  },
  form: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
  },
  button: {
    backgroundColor: 'rgb(227, 11, 23)',
    height: 40,
    margin: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
