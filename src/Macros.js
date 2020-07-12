import React from "react";
import { StyleSheet, View, Button, Text, TextInput, FlatList } from "react-native";

export default class Macros extends React.Component {
  static navigationOptions = {
    title: "My Macros",
  };

  //storing results from the api into this local state
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }


  render() {
    const { navigate } = this.props.navigation;
    const data = this.props.navigation.getParam('totalCal', 'nothing sent')
    console.log(this.props.navigation.getParam());

    return (
      //styling for navigation container
      <View style={styles.container}>
        
        <View style={styles.topStyle}>

        </View>


        <View> 
        <Text>{JSON.stringify(data) }</Text>
        </View>


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
    backgroundColor: "red",

  },

  topStyle: {
    backgroundColor: "blue",
    height: 300,
    margin: 30
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
