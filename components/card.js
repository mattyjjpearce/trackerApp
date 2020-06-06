import React from 'react';
import {view, StyleSheet, View} from 'react-native';

const Card = props => {
return <View style={{...styles.card, ...props.style}}>{props.children}</View>
};
// notice the style for the view above, the ... allows us child components to use the card style and overwrite them 
const styles = StyleSheet.create({
    card: {
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10
    }
});


export default Card;