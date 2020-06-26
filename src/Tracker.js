import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import NewModal from "../components/modal";

const APP_ID = "9ef9baef";
const APP_KEY = "f48b3d6c5374f60449cfe909f947a540";



/**
 * Profile screen
 */
export default class Tracker extends React.Component {
  static navigationOptions = {
    title: "Tracker",
  };

  //storing results from the api into this local state
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      show: false,
      varFoodId: null,
      totalCalories: 0,
      currentCalories: 0
    };
  }




  fetchData = (item) => {
    fetch(
      `https://api.edamam.com/api/food-database/parser?ingr=${item}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) =>
      {
     //   console.log(responseJson);

        this.setState({
          itemArray: responseJson.hints,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    Keyboard.dismiss();

    
  };

  fetchOnPressOpacity(item) {
  // need to get the real index value, at the moment only getting 0 as we have not set it to the one we pressed  console.log(this.state.itemArray[index]);
    console.log(this.state.currentCalories)

    this.state.currentCalories += item.food.nutrients.ENERC_KCAL;
  this.setState({
      show: true,
   //   index: this.data.index
    });

    this.fetchData(this.state.item);
    console.log(item.food.nutrients.ENERC_KCAL)
  //  console.log(this.state.itemArray[1])
  }

  render() {
    const { navigate, state } = this.props.navigation;
    const show = this.props.show;

    return (
      <View style={styles.container}>
        <Text>{this.state.currentCalories} </Text>
        <View style={styles.viewForInputContainer}>
          <TextInput
            onChangeText={(text) => this.setState({ item: text })}
            style={styles.textInputContainer}
            clearTextOnFocus={true}
          >
            <Text style={styles.textColour}> Search Food </Text>
          </TextInput>
        </View>

        <Button
          title="Search"
          onPress={() => this.fetchData(this.state.item)}
        />

        <View style={styles.ViewFilterContainer}>
          <TouchableOpacity style={styles.ViewFilterContainer}>
            <View style={styles.filterButtonView}>
              <Text style={styles.filterText}> Filter </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.paddingForResultsContainer}>
          <FlatList
            style={styles.resultsBackground}
            data={this.state.itemArray}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => this.fetchOnPressOpacity(item, index)}>
                <View style={styles.resultsContainer}>
                  <View style={styles.textView}>
                    <Text style={styles.resultsText}>
                      {item.food.label}
                      {item.food.brand}
                      {index}
                    </Text>
                  </View>
                  <View style={styles.nutritionResultsText}>
                    <Text style={styles.resultsTextSubInfo}>
                      F: {Math.round(item.food.nutrients.FAT)}
                    </Text>
                    <Text style={styles.resultsTextSubInfo}>
                      C: {Math.round(item.food.nutrients.CHOCDF)}
                    </Text>
                    <Text style={styles.resultsTextSubInfo}>
                      P: {Math.round(item.food.nutrients.PROCNT)}
                    </Text>
                    <Text style={styles.resultsTextSubInfo}>
                      K/Cal: {Math.round(item.food.nutrients.ENERC_KCAL)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
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
  ViewFilterContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    alignItems: "flex-start",
  },

  filterText: {
    color: "#919191",
  },

  filterButtonView: {
    shadowOpacity: 0.3,
    padding: 5,
    alignItems: "center",
    backgroundColor: "white",
    width: 70,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    padding: 10,
    bottom: 0,
    backgroundColor: "#5979D9",
    justifyContent: "space-evenly",
  },

  viewForInputContainer: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },

  textInputContainer: {
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

  paddingForResultsContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  resultsBackground: {
    height: "70%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 0.1,
    shadowOpacity: 0.7,
  },
  resultsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#5979D9",
  },

  textView: {
    borderBottomWidth: 1,
  },

  resultsText: {
    color: "black",
    fontFamily: "Avenir",
    borderRightWidth: 1,
    flexDirection: "column",
  },

  nutritionResultsText: {
    fontFamily: "Avenir",
    flex: 1,
    alignSelf: "flex-end",
  },
  outViewStyle: {
    padding: 10,
  },
  resultsTextSubInfo: {
    paddingLeft: 5,
  },

  modalView: {
    marginTop: 100,
    height: "70%",
    width: "95%",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 0.1,
    shadowOpacity: 0.7,
    backgroundColor: "white",
  },
});
