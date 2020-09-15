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
import getCats from '../apis/cats';

export default class CatList extends React.Component {

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
    getCats(10, 10) // 10 random results from 10th page
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson, refreshing: false });
      }).catch(e => {
        console.log(e);
        this.setState({ refreshing: false });
      });
  }

  ItemSeparator = () => <View style={styles.separator} />

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
          renderItem={this.renderItemComponent}
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
  separator: {
    height: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    marginRight: 10,
  }
});