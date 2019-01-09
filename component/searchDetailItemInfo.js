import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from "react-native-elements";

/**
 * 기간/지역별 등 리스트에서 클릭 시 들어온 데이터 상세
 */
export default class searchDetailItemInfo extends Component {

    static navigationOptions = {
        title: '상세정보',
    };

    constructor(props){
        super(props);
        this.state = {isLoading : false, item : this.props.navigation.state.params.item} //리스트 클릭시 상세 정보
        console.log('next : ------------------------ ' + this.state.item.seq);
    }

    componentDidMount = (state)=>{

        const {item} = this.state.item;
        console.log("seq : " + item.seq);

        // 공연/전시 상세 정보 호출
        return fetch('http://172.30.1.30:8080/api/searchPerformanceInfo',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                seq: item.seq
            }),
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
          console.log(responseJson)
          this.setState({
            isLoading: false,
            dataSource: responseJson.body.msgData
          });
        }).catch((error)=>{
            console.log(error.message);
            throw error;
        });
      }

    render(){
        const {item} = this.state.item;
        return(
            <View>
                <Text>{item.title}</Text>
                <Text>{item.seq}</Text>
            </View>
        );
    }
}