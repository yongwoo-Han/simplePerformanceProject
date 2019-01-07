import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';

export default class FlatListBasics extends Component {

  constructor(props){
    super(props);
    this.state = {isLoading:true, dataSource:{}}
  }

  componentDidMount=()=>{
    return fetch('http://172.30.1.30:8080/api/searchPerformanceList')
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.log(responseJson)
      this.setState({
        isLoading: false,
        dataSource: responseJson.msgData
      });
    }).catch((error)=>{
        console.log(error.message);
        throw error;
    });
  }

  render() {

    const {perforList} = this.state.dataSource;
    console.log(perforList);
    
    if(this.state.isLoading){
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator/>
      </View>
    }

    return (
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={perforList}
          renderItem={({item}) => <Text>{item.title}</Text>}
          // keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('simplePerformanceProject', () => FlatListBasics);