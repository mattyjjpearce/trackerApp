import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  FlatList,
  Modal,
  Animated,
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
      UsersDailyCalories: 0,
      CalsFatInput: 0,
      CalsProteinInput: 0,
      CalsCarbsInput: 0,
      CaloriePercentage: 0,
    };
    console.log(props);
  }

  setMacroGoalModal = () => {
    this.setState({
      showModal: true,
    });
  };

  setMacros = (ProteinInput, FatInput, CarbsInput) => {
    let CalsProteinInput = ProteinInput * 4;
    let CalsFatInput = FatInput * 9;
    let CalsCarbsInput = CarbsInput * 4;
    let totalCalsSet = CalsCarbsInput + CalsFatInput + CalsProteinInput;

    let CaloriePercentage = (totalCalsSet / 2400) * 100;
    this.setState({
      totalCalsSet: totalCalsSet,
      CalsProteinInput: ProteinInput,
      CalsFatInput: FatInput,
      CalsCarbsInput: CalsCarbsInput,
      showModal: false,
      CaloriePercentage: CaloriePercentage,
    });
    console.log(totalCalsSet);
  };

  render() {
    const { navigate } = this.props.navigation;
    let CaloriePercentage = this.state.CaloriePercentage + "%";
    console.log(CaloriePercentage);

    let totalCals = this.props.navigation.getParam("totalCal", "nothing sent");
    totalCals = JSON.stringify(totalCals);

    return (
      //styling for navigation container
      <View style={styles.container}>
        <View style={styles.topStyle}>
          <View style={styles.setMacros}>
            <TouchableOpacity onPress={() => this.setMacroGoalModal()}>
              <Text> Set Daily Macro Goal </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewOfMacros}>
            <Text>Cals: {this.state.totalCalsSet}</Text>
            <Text alignSelf="center">{Math.floor(this.state.CaloriePercentage)}%</Text>

            <View style={styles.progressBar}>
              <Animated.View
                style={
                  ([StyleSheet.absoluteFill],
                  { backgroundColor: "#8BED4F", width: CaloriePercentage })
                }
              />
            </View>
            <Text>Fat: {this.state.CalsFatInput}</Text>
            <Text>Carbs: {this.state.CalsCarbsInput}</Text>
            <Text>Protein: {this.state.CalsProteinInput}</Text>
          </View>

          <View>
            <Modal
              transparent={false}
              visible={this.state.showModal}
              animationType="slide"
              presentationStyle="formSheet"
            >
              <View style={styles.modalView}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({ FatInput: text })}
                  clearTextOnFocus={true}
                >
                  <Text>Enter Fats</Text>
                </TextInput>
              </View>
              <View style={styles.modalView}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({ CarbsInput: text })}
                  clearTextOnFocus={true}
                >
                  <Text>Enter Carbs</Text>
                </TextInput>
              </View>

              <View style={styles.modalView}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={(text) => this.setState({ ProteinInput: text })}
                  clearTextOnFocus={true}
                >
                  <Text>Enter Protein</Text>
                </TextInput>
              </View>

              <Button
                title="Set Macros"
                onPress={() =>
                  this.setMacros(
                    this.state.ProteinInput,
                    this.state.FatInput,
                    this.state.CarbsInput
                  )
                }
                color="Black"
              />

              <Button
                title="Cancel"
                onPress={() =>
                  this.setState({
                    showModal: false,
                  })
                }
              >
                {" "}
              </Button>
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

  modalView: {
    width: "60%",
    margin: 20,
    alignSelf: "center",
  },

  textInputStyle: {
    alignSelf: "center",
    padding: 10,
    borderRadius: 3,
    backgroundColor: "white",
    borderColor: "black",
    width: "70%",
    color: "#919191",
    fontSize: 18,
    fontFamily: "Avenir-Light",
    shadowOpacity: 0.9,
    shadowRadius: 3.84,
    shadowColor: "black",
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
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

  progressBar: {
    margin: 10,
    height: 20,
    width: "70%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    flexDirection: "row",
  },
  viewOfMacros: {
    margin: 5,
  },
});
