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
  View,
  Image,
  TouchableOpacity
} from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: true,
    }
  }

  componentDidMount() {
    this.fetchCats();
  }

  fetchCats() {
    this.setState({ refreshing: true });
    fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1') // 1
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson });
        this.setState({ refreshing: false });
      }).catch(e => {
        console.log(e);
        this.setState({ refreshing: false });
      });
  }

  ItemSeparator = () => <View style={{
    height: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    marginRight: 10,
  }} />

  renderItemComponent = (data) =>
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={{ uri: data.item.url }} />
    </TouchableOpacity>

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => { this.fetchCats() });
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.data}
          renderItem={item => this.renderItemComponent(item)}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this.ItemSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
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