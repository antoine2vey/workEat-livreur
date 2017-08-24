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
  StatusBar
} from 'react-native';
import { Form, Icon, Separator, InputField } from 'react-native-form-generator';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Home from './Home';
import { TextField } from 'react-native-material-textfield';

const URL = 'http://192.168.0.17:3001';

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      email: 'livreur@gmail.com',
      password: 'azerty',
      disabled: false,
    };
  }

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
        const token = res.data.token;
        const decodedToken = jwtDecode(token);
        this.props.navigation.navigate('Home', { token, decodedToken });
      })
      .catch(err => {
        Alert.alert('Erreur', 'Mauvais identifiants')
        console.log(err);
      });
  }

  render() {
    let { email, password } = this.state;
    return (
      <ScrollView style={form.scroll}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
        />
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
  Login: {
    screen: Login,
  },
  Home: {
    screen: Home,
  }
}, {
  navigationOptions: {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTitle: (
      <Image
        source={require('../logo.png')}
        resizeMode="cover"
        style={{
          width: 300,
          flex: 1,
          height: null,
        }}
      />
    )
  }
});

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const white = '#FFFFFF';
const gold = 'rgb(236,215,133)'

const form = StyleSheet.create({
  logo: {
    width: width - 100,
    alignSelf: 'center',
    marginTop: 20,
    resizeMode: 'contain',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    padding: 5,
    margin: 10,
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
    width: width,
    height: height,
    flex: 1,
    alignSelf:'stretch',
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  formContainer: {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    backgroundColor: gold,
    height: 60,
    marginTop: 50,
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
