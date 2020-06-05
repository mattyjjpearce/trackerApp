import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import Colors from "../constants/colors";

const APP_ID = "9ef9baef";
const APP_KEY = "f48b3d6c5374f60449cfe909f947a540";
const url =
  "https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=${APP_ID}&app_key=${APP_KEY}";

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

  componentDidMount() {
    return fetch(
      `https://api.edamam.com/api/food-database/parser?ingr=red%20apple&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
          alert(JSON.stringify(responseJson))
        this.setState({
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
        <Text> hi</Text>

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
});
