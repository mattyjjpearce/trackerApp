import React from 'react';
import { StyleSheet, View, Button, Text } from "react-native";

export default class navBar extends React.Component {

};

render(){ 
return ( 
    <View style={styles.buttonContainer}/>
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
);
}

export default navBar; 

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