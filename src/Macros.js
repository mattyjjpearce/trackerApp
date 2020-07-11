import React from "react";
import { StyleSheet, View, Button, Text, TextInput, FlatList } from "react-native";

const APP_ID = "9ef9baef";
const APP_KEY = "f48b3d6c5374f60449cfe909f947a540";

export default class Macros extends React.Component {
  static navigationOptions = {
    title: "Macros",
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


  render() {
    const { navigate } = this.props.navigation;
    const data = this.props.navigation.getParam('test', 'nothing sent')
    console.log(this.props.navigation.getParam());

    return (
      //styling for navigation container
      <View style={styles.container}>
        
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
