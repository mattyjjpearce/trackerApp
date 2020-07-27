import React from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
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
    this.getData();

    //redesign the entire project.

    this.state = {
      isLoading: true,
      dataSource: null,
      totalCalsSet: 0,
      showModal: false,
      showModal2: false,
      UsedDailyCalories: 0,
      UsedDailyFat: 0,
      UsedDailyCarbs: 0,
      UsedDailyProtein: 0,
      CalsFatInput: 0,
      CalsProteinInput: 0,
      CalsCarbsInput: 0,
      CaloriePercentage: 0,
      FatPercentage: 0,
      CarbPercentage: 0,
      ProteinPercentage: 0,
      FatSet: 0,
      CarbsSet: 0,
      ProteinSet: 0,
    };
    console.log(this.props.navigation);
  }

  componentWillMount() {
    this.setState({
      CaloriesFromTracker: this.props.navigation.getParam(
        "totalCals",
        "nothing sent"
      ),
      FatsFromTracker: this.props.navigation.getParam(
        "totalFat",
        "nothing sent"
      ),
      CarbsFromTracker: this.props.navigation.getParam(
        "totalCarbs",
        "nothing sent"
      ),
      ProteinFromTracker: this.props.navigation.getParam(
        "totalProtein",
        "nothing sent"
      ),
      foodLabelFromTracker: this.props.navigation.getParam(
        "label",
        "nothing sent"
      ),
    });
  }

  setMacroGoalModal = () => {
    this.setState({
      showModal: true,
    });
  };

  AddMacrosModal = () => {
    this.setState({
      showModal2: true,
    });
  };

  addMacrosManually = (ProteinInput, FatInput, CarbsInput) => {
    let CalsProteinInput = ProteinInput * 4;
    let CalsFatInput = FatInput * 9;
    let CalsCarbsInput = CarbsInput * 4;

    let CalsCalorieInput = CalsCarbsInput + CalsFatInput + CalsProteinInput;

    this.state.UsedDailyCalories += CalsCalorieInput;
    this.state.UsedDailyCarbs += parseInt(CarbsInput);
    this.state.UsedDailyFat += parseInt(FatInput);
    this.state.UsedDailyProtein += parseInt(ProteinInput);

    this.setState({
      UsedDailyCalories: this.state.UsedDailyCalories,
      UsedDailyFat: this.state.UsedDailyFat,
      UsedDailyCarbs: this.state.UsedDailyCarbs,
      UsedDailyProtein: this.state.UsedDailyProtein,
      showModal2: false,
    });

    const firstPair = [
      "UsedTotalCalories",
      JSON.stringify(this.state.UsedDailyCalories),
    ];
    const secondPair = [
      "UsedTotalCarbs",
      JSON.stringify(this.state.UsedDailyCarbs),
    ];
    const thirdPair = [
      "UsedTotalProtein",
      JSON.stringify(this.state.UsedDailyProtein),
    ];
    const fourthPair = [
      "UsedTotalFat",
      JSON.stringify(this.state.UsedDailyFat),
    ];

    try {
      this.setState({});
      var usedValues = [firstPair, secondPair, thirdPair, fourthPair];
      AsyncStorage.setItem("DATA_KEY", JSON.stringify(usedValues));
    } catch (error) {
      console.log(error);
    }

    this.getPercent();
  };

  setMacros = async (ProteinInput, FatInput, CarbsInput) => {
    let CalsProteinInput = ProteinInput * 4;
    let CalsFatInput = FatInput * 9;
    let CalsCarbsInput = CarbsInput * 4;
    let totalCalsSet = CalsCarbsInput + CalsFatInput + CalsProteinInput;

    this.setState({
      totalCalsSet: totalCalsSet,
      CalsProteinInput: ProteinInput,
      CalsFatInput: CalsFatInput,
      CalsCarbsInput: CalsCarbsInput,
      showModal: false,
      FatSet: FatInput,
      CarbsSet: CarbsInput,
      ProteinSet: ProteinInput,
    });

    const firstPair = ["totalCalsSet", JSON.stringify(this.state.totalCalsSet)];
    const secondPair = ["FatSet", JSON.stringify(FatSet)];
    const thirdPair = ["ProteinSet", JSON.stringify(ProteinSet)];
    const fourthPair = ["CarbsSet", JSON.stringify(CarbsSet)];

    try {
      this.setState({});
      var setValues = [firstPair, secondPair, thirdPair, fourthPair];
      AsyncStorage.setItem("DATA_KEY", JSON.stringify(setValues));
    } catch (error) {
      console.log(error);
    }
  };

  getData = async () => {
    try {
      AsyncStorage.multiGet(["key1", "key2"]).then((response) => {});
    } catch (e) {
      // read error
    }
  };

  getPercent = () => {
    let CaloriePercentage =
      (this.state.UsedDailyCalories / this.state.totalCalsSet) * 100;
    let FatPercentage = (this.state.UsedDailyFat / this.state.FatSet) * 100;
    let CarbPercentage =
      (this.state.UsedDailyCarbs / this.state.CarbsSet) * 100;
    let ProteinPercentage =
      (this.state.UsedDailyProtein / this.state.ProteinSet) * 100;

    this.setState({
      CaloriePercentage: CaloriePercentage,
      FatPercentage: FatPercentage,
      CarbPercentage: CarbPercentage,
      ProteinPercentage: ProteinPercentage,
    });
  };

  render() {
    console.log(this.state.UsedDailyCalories);
    const { navigate } = this.props.navigation;
    let CaloriePercentage = this.state.CaloriePercentage + "%";
    let FatPercentage = this.state.FatPercentage + "%";
    let CarbPercentage = this.state.CarbPercentage + "%";
    let ProteinPercentage = this.state.ProteinPercentage + "%";

    return (
      //styling for navigation container
      <View style={styles.container}>
        <View style={styles.topStyle}>
          <View style={styles.newSetMacros}>
            <TouchableOpacity onPress={() => this.setMacroGoalModal()}>
              <Text> Set Macros</Text>
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.viewOfMacros}>
              <Text>Daily Calories: {this.state.totalCalsSet} </Text>
              <Text style={styles.minusColour}> - {this.state.UsedDailyCalories} </Text>
            
            </View>

            <View style={styles.progressBar}>
              <Animated.View
                style={
                  ([StyleSheet.absoluteFill],
                  {
                    backgroundColor: "#5979D9",
                    width: CaloriePercentage,
                  })
                }
              />
                <Text> {Math.floor(this.state.CaloriePercentage)}%</Text>
            </View>
          </View>

          <View style={styles.addMacros}>
            <View style={styles.addMacrosManually}>
              <TouchableOpacity
                style={styles.setMacros}
                onPress={() => this.AddMacrosModal()}
              >
                <Text style={styles.addText}> Add Macros </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.macroText}>Fat </Text>
              <View style={styles.viewOfMacros}>
                <Text>{this.state.FatSet} </Text>
                <Text style={styles.minusColour}>
                  - {this.state.UsedDailyFat}
                </Text>
              </View>

              <View style={styles.progressBar}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {
                      backgroundColor: "#5979D9",
                      width: FatPercentage,
                    })
                  }
                />
                <Text> {Math.floor(this.state.FatPercentage)}%</Text>
              </View>
            </View>

            <View>
              <Text style={styles.macroText}>Carbs</Text>

              <View style={styles.viewOfMacros}>
                <Text>{this.state.CarbsSet} </Text>
                <Text style={styles.minusColour}>
                  - {this.state.UsedDailyCarbs}{" "}
                </Text>
              </View>

              <View style={styles.progressBar}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {
                      backgroundColor: "#5979D9",
                      width: CarbPercentage,
                    })
                  }
                />
                <Text>{Math.floor(this.state.CarbPercentage)}%</Text>
              </View>
            </View>

            <View>
              <Text style={styles.macroText}>Protein</Text>
              <View style={styles.viewOfMacros}>
                <Text>{this.state.ProteinSet} </Text>
                <Text style={styles.minusColour}>
                  {" "}
                  - {this.state.UsedDailyProtein}{" "}
                </Text>
              </View>

              <View style={styles.progressBar}>
                <Animated.View
                  style={
                    ([StyleSheet.absoluteFill],
                    {
                      backgroundColor: "#5979D9",
                      width: ProteinPercentage,
                    })
                  }
                />
                <Text> {Math.floor(this.state.ProteinPercentage)}%</Text>
              </View>
            </View>
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
              ></Button>
            </Modal>
          </View>
        </View>

        <View>
          <Modal
            transparent={false}
            visible={this.state.showModal2}
            animationType="slide"
            presentationStyle="formSheet"
          >
            <View style={styles.modalView}>
              <View style={styles.searhedStyle}>
                <Text> Item you recently searched: </Text>
                <Text> {this.state.foodLabelFromTracker} </Text>
                <Text> Fat: {this.state.FatsFromTracker} </Text>
                <Text> Carbs: {this.state.CarbsFromTracker} </Text>
                <Text> Protein: {this.state.ProteinFromTracker} </Text>
              </View>

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
              title="Add Macros"
              onPress={() =>
                this.addMacrosManually(
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
                  showModal2: false,
                })
              }
            ></Button>
          </Modal>
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

  modalView: {
    width: "60%",
    margin: 20,
    alignSelf: "center",
  },

  newSetMacros: {
    alignSelf: "center",
    borderWidth: .5,
    padding: 5,
    backgroundColor: "#5979D9",
    shadowOpacity: 1,
    marginBottom: 20,
    shadowRadius: 3.84,

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
    borderWidth: .5,
    padding: 5,
    backgroundColor: "#5979D9",
    shadowOpacity: 1,
    marginBottom: 20,
    shadowRadius: 3.84,


  },

  topStyle: {
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
    shadowOpacity: 0.5,
  },
  viewOfMacros: {
    paddingTop: 0,
    flexDirection: "row",
    margin: 0,
    marginLeft: 45,
  },

  searhedStyle: {
    padding: 5,
    borderWidth: 1,
  },

  addMacros: {
    margin: 10,
    paddingTop: 20,
  },

  minusColour: {
    color: "red",
  },
  macroText: {
    marginTop: 10,
    alignSelf: "center",
    fontSize: 18,
  },

  addText: {
    color: "black"
  }


  
});
/*
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
    },*/
