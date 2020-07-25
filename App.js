/**
 * App.js
 *
 * Root component of the app,
 * responsible for setting up routes.
 *
 */

// Libs
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Components
import Tracker from "./src/Tracker";
import Shops from "./src/Shops";
import Macros from "./src/Macros";

/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
 */
const Navigator = createStackNavigator({
  Macros: { screen: Macros },
  Tracker: { screen: Tracker },
  Shops: { screen: Shops },


});

/**
 * createAppContainer
 *
 * Responsible for managing app state and linking
 * the top-level navigator to the app environment.
 *
 */
const App = createAppContainer(Navigator);

export default App;
