import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text, TextInput, FlatList } from "react-native";
import Colors from "../constants/colors";

const APP_ID = "9ef9baef";
const APP_KEY = "f48b3d6c5374f60449cfe909f947a540";


export default class Home extends React.Component {
  static navigationOptions = {
    title: "Home",
  };

  //storing results from the api into this local state
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }
//ingr is the key, and we let the user find

  fetchData  =(item)=>{
      console.log(item)
    fetch(
        `https://api.edamam.com/api/food-database/parser?ingr=${item}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            // alert(JSON.stringify(responseJson)) //ingr this is your key this is wat the api will return for you. so we need to send whichver food item that we are looking for / can we let a user search and return an item? yes. heymaybe i can call you an explain to you yes on what?watspp? i do not have discord?..... wait teamviewer has call featureok    // can you show me how to search for an item? yes sure
          this.setState({
            itemArray:responseJson.parsed,
            isLoading: false,
            dataSource: null,
          })
        })
        .catch((error) => {
            console.log(error)
        })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      //styling for navigation container
      <View style={styles.container}>
        <TextInput onChangeText={(text)=>this.setState({item:text})} style={styles.textInput} placeholder = "Input here"> </TextInput>
        <Button title="Find"
                onPress={() => this.fetchData(this.state.item)}
        />

        <FlatList 
        style={{height:100,width:200}}
        data = {this.state.itemArray} 
        renderItem={({ item })=>
        
        <View style={{flex:1}}>
           <View> 
              <Text style={{}}>Fat:</Text> 
               <Text style={{}}>Fat: {item.food.nutrients.FAT}</Text> 
           </View>
            <Text>{item.food.nutrients.FIBTG}</Text>

        </View>}
        />
        <View style={styles.buttonContainer}>
          <View>
            <Button
              title="Tracker"
              onPress={() => navigate("Tracker")}
              color="white"
            />
          </View>
          <Button
            title="Shops"
            onPress={() => navigate("Shops")}
            color="white"
          />
          <Button title="Home" onPress={() => navigate("Home")} color="white" />
          <Button
            title="Macros"
            onPress={() => navigate("Macros")}
            color="white"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    padding: 20,
    bottom: 0,
    backgroundColor: "#5979D9",
    justifyContent: "space-evenly",
  },

  textInput: {
      borderWidth:2,
      borderColor:'black',

      height: 20,
      width: 100
  }
});
