import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
} from "react-native";

import Card from "../components/card";
// edamam keys
// const APP_ID = "9ef9baef";
// const APP_KEY = "f48b3d6c5374f60449cfe909f947a540";

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
      // edamam `https://api.edamam.com/api/food-database/parser?ingr=${item}&app_id=${APP_ID}&app_key=${APP_KEY}`
      `https://trackapi.nutritionix.com/v2/search/instant?query=${item}`,
      {
        headers: {
          "x-app-id": "0f092d40",
          "x-app-key": "a9d3743339dce2115fb110ecc7ce7214",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(responseJson.branded[0].food_name);
        // alert(JSON.stringify(responseJson)); //ingr this is your key this is wat the api will return for you. so we need to send whichver food item that we are looking for / can we let a user search and return an item? yes. heymaybe i can call you an explain to you yes on what?watspp? i do not have discord?..... wait teamviewer has call featureok    // can you show me how to search for an item? yes sure
        this.setState({
          itemArray: responseJson.parsed,
          branded: responseJson.branded,
          isLoading: false,
          dataSource: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //second method to get nutrients
  fetchData = (item) => {
    console.log(item);
    fetch(
      // edamam `https://api.edamam.com/api/food-database/parser?ingr=${item}&app_id=${APP_ID}&app_key=${APP_KEY}`
      `https://trackapi.nutritionix.com/v2/search/instant?query=${item}`,
      {
        headers: {
          "x-app-id": "0f092d40",
          "x-app-key": "a9d3743339dce2115fb110ecc7ce7214",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(responseJson.branded[0].food_name);
        console.log(responseJson.branded[0].nix_item_id);
        // alert(JSON.stringify(responseJson));
     /* 
        let x = 
        fetch(
             `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${x}`,

            headers: {
              "x-app-id": "0f092d40",
              "x-app-key": "a9d3743339dce2115fb110ecc7ce7214",
            },
          }
          .then((res) => {})
          .then((anotherJson) -> {})
        );
        
         */ 

        this.setState({
          itemArray: responseJson.parsed,
          branded: responseJson.branded,
          isLoading: false,
          dataSource: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { navigate, state } = this.props.navigation;

    return (
      //styling for navigation container
      <View style={styles.container}>
        <View style={styles.viewForInputContainer}>
          <TextInput
            onChangeText={(text) => this.setState({ item: text })}
            style={styles.textInputContainer}
          >
            <Text style={styles.textColour}> Find Food!</Text>
          </TextInput>
          <Button
            title="Search"
            onPress={() => this.fetchData(this.state.item)}
          />

          <FlatList
            style={styles.resultsBackground}
            data={this.state.branded}
            renderItem={({ item, index }) => (
             <View
             style={styles.outViewStyle}>
             <View style={styles.resultsStyle}>
                <Text style={styles.resultsText}>{item.food_name}</Text>
                <Text> F: </Text>
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

  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    padding: 20,
    bottom: 0,
    backgroundColor: "#5979D9",
    justifyContent: "space-evenly",
  },

  viewForInputContainer: {
    padding: 20,
  },
  textInputContainer: {
    borderColor: "black",
    borderWidth: 1,
    width: "70%",
    color: "#919191",
    fontSize: 22,
    fontFamily: "Avenir",

    // backgroundColor: "blue"
  },

  resultsBackground: {
    height: "50%",
    width: "90%",
    padding: 5,
    alignSelf: "center",
    borderRadius: 10,
  },
  resultsStyle: {
    flex: 2,
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 10,
    backgroundColor: "#5979D9",
    shadowOpacity: 0.3,
    backfaceVisibility: "hidden"
  },

  resultsText: {
    opacity: 1,
    color: "black",
  },
  outViewStyle: {
    padding : 10
  }
});
