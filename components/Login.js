import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Form, Icon, Separator, InputField } from 'react-native-form-generator';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ProductList from './ProductList';
import { TextField } from 'react-native-material-textfield';

const URL = 'http://192.168.0.17:3001';

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
    let { email, password } = this.state;
    return (
      <ScrollView style={form.scroll}>
        <Image source={require('../map.png')} style={form.backgroundImage} />
        <View style={form.formContainer}>
          <Form
            ref="registrationForm"
            label="Personal Information"
            onChange={this.handleFormChange.bind(this)}
            style={form.form}
          >
            <Image source={require('../logo-blanc.png')} style={form.logo} />
            <Text style={form.text}>
              <Text
                style={{
                  fontWeight: '200',
                }}
              >
                Espace livreur
              </Text>
            </Text>
            <View style={form.inputContainer}>
              <TextField
                label='Email'
                ref='email'
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
                baseColor="rgb(255, 255, 255)"
                tintColor="rgb(236,215,133)"
                style={form.input}
                onChangeText={ (email) => this.setState({ email }) }
              />
            </View>
            <View style={form.inputContainer}>
              <TextField
                label="Mot de passe"
                ref='password'
                secureTextEntry={true}
                value={password}
                autoCapitalize="none"
                keyboardType="default"
                baseColor="rgb(255, 255, 255)"
                tintColor="rgb(236,215,133)"
                style={form.input}
                onChangeText={ (password) => this.setState({ password }) }
              />
            </View>
            {/* <InputField
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
            /> */}
            <TouchableOpacity
              disabled={this.state.disabled}
              onPress={this.connect.bind(this)}
              style={form.button}>
              <Text style={form.textButton}>{'Se connecter'.toUpperCase()}</Text>
            </TouchableOpacity>
          </Form>
        </View>
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

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var white = '#FFFFFF';
var gold = 'rgb(236,215,133)'

const form = StyleSheet.create({
  logo: {
    width: width - 100,
    alignSelf: 'center',
    flex: 1,
    resizeMode: 'contain'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    padding: 5,
    margin: 10,
    flex: 1,
    color: white,
  },
  backgroundImage: {
    flex: 1,
    resizeMode:'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  input: {
    color: white,
  },
  inputContainer: {
    marginBottom: 20,
  },
  form: {
    marginLeft: 40,
    marginRight: 40,
  },
  formContainer: {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    backgroundColor: gold,
    height: 50,
    margin: 15,
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  scroll: {
  }
});
