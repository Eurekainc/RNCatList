/**
 * @author Pavneet Singh
 * 
 * @format
 * @flow strict-local
 */

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

export default class CatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.fetchCats();
  }

  fetchCats() {
    fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1') // 1
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson });
        console.log("response is " + resJson);
      }).catch(e => console.log(e));
  }

  renderItemComponent = (data) =>
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={{ uri: data.item.url }} />
    </TouchableOpacity>

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.data}
          renderItem={item => this.renderItemComponent(item)}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>)
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 6,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    height: '100%',
    borderRadius: 4,
  },
});
