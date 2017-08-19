import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import axios from 'axios';
const URL = 'https://localhost:3001';

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${URL}/api/products`)
      .then(products => {
        console.log(products);
        this.setState({ products: products.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          <ProductList products={this.state.products} />
        </View>
      </ScrollView>
    );
  }
}

class ProductList extends Component {
  render() {
    const { products } = this.props;
    console.log(products);
    return (
      <View>
        {products.map(product => {
          return (
            <Product
              key={product._id}
              product={product}
              style={styles.product}
            />
          );
        })}
      </View>
    );
  }
}

class Product extends Component {
  render() {
    console.log(this.props.product);
    const { name, file, description, price, tags } = this.props.product;

    return (
      <View>
        <View style={product.imageContainer}>
          <Image
            source={{ uri: `${URL}/${file}` }}
            resizeMode="cover"
            style={product.image}
          />
        </View>
        <View style={product.content}>
          <Text style={product.title}>
            {name}
          </Text>
          <Text style={product.description}>
            {description}
          </Text>
          <View style={product.infoContainer}>
            <View style={product.tagContainer}>
              {tags.map(tag =>
                <Text key={tag._id} style={product.tag}>
                  {tag.name}
                </Text>
              )}
            </View>
            <Text style={product.price}>
              {price}€
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#F5FCFF',
  },
});

const product = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
    width: null,
    height: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    fontWeight: '100',
    paddingBottom: 10,
  },
  content: {
    padding: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tagContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  price: {
    fontSize: 24,
    color: 'red',
    fontWeight: '500',
  },
  tag: {
    fontWeight: '200',
    opacity: 0.7,
    fontSize: 14,
  },
});
