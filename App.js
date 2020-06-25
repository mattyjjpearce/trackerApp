/**
 * App.js
 *
 * Root component of the app, 
 * responsible for setting up routes.
 *
*/

// Libs
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Components
import Home from './src/Home';
import Tracker from './src/Tracker';
import Shops from './src/Shops';
import Macros from './src/Macros';
import foodInfo from './src/foodInfo';



/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
*/
const Navigator = createStackNavigator({
    Home: { screen: Home },
    Tracker: { screen: Tracker },
    Shops: {screen: Shops}, 
    Macros: {screen: Macros}, 
    foodInfo: {screen: foodInfo},

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