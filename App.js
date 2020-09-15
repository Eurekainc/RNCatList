/**
 * @author Pavneet Singh
 * 
 * @format
 * @flow strict-local
 */

import React from "react";
import {SafeAreaView,} from "react-native";
import CatList from './src/components/CatList';

export default class App extends React.Component {

  render() {
    return (
      <SafeAreaView>
        <CatList />
      </SafeAreaView>)
  }
}