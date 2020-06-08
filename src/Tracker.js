import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from "react-native";



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
    };
  }
  //This is fetching the data for info such as name and to get the item ID
   
  fetchData = (item) => {

    console.log(item);
    fetch(
      `https://api.edamam.com/api/food-database/parser?ingr=${item}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        //  alert(JSON.stringify(responseJson)); //ingr this is your key this is wat the api will return for you. so we need to send whichver food item that we are looking for / can we let a user search and return an item? yes. heymaybe i can call you an explain to you yes on what?watspp? i do not have discord?..... wait teamviewer has call featureok    // can you show me how to search for an item? yes sure
        this.setState({
          itemArray: responseJson.hints,
        });
      })
      .catch((error) => {
        console.log(error);
      });
      // dimisses keyboard if they press the button on the screen
      Keyboard.dismiss()

  };



  render() {
    const { navigate, state } = this.props.navigation;
    return (

      <View style={styles.container}> 
        <View style={styles.viewForInputContainer}>
          <TextInput
            onChangeText={(text) => this.setState({ item: text })}
            style={styles.textInputContainer}
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
            renderItem={({ item }) => (
              <View style={styles.resultsContainer}>
                <View style={styles.textView}>
                  <Text style={styles.resultsText}>
                    {item.food.label}
                    {item.food.brand}
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
    paddingBottom: 50
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
});
