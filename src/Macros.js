import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

export default class Macros extends React.Component {
  static navigationOptions = {
    title: "My Macros",
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      totalCalsSet: 0,
      showModal: false,
    };
    console.log(props);
  }

  setMacroGoal = () => {
    this.setState({
      showModal: true,
    });
  };

  render() {
    const { navigate } = this.props.navigation;

    let totalCals = this.props.navigation.getParam("totalCal", "nothing sent");
    totalCals = JSON.stringify(totalCals);


    
    return (
      //styling for navigation container
      <View style={styles.container}>
        <View style={styles.topStyle}>
          <View style={styles.setMacros}>
            <TouchableOpacity onPress={() => this.setMacroGoal()}>
              <Text> Set Daily Macro Goal </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Modal transparent={false} visible={this.state.showModal}>
           
              <Text>Hi </Text>

              <Button title="back" onPress={() => this.setState({ 
                showModal: false,
              })}> </Button>
            </Modal>
          </View>
        </View>

        <View>
          <Text>{totalCals}</Text>
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

  setMacros: {
    alignSelf: "center",
    borderWidth: 1,
  },

  topStyle: {
    backgroundColor: "white",
    height: 300,
    margin: 30,
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
