import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {purple, white} from '../utils/colors'

export default function Deck ({deck}) {
	return(
		<View>		
			<Text style={styles.deck}>{deck.title}</Text>
		</View>
	)	
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	deck: {
    backgroundColor: purple,
		color: white,
    borderRadius: 2,
    justifyContent: 'center',
		fontSize: 32,
    textAlign: 'center',
		marginTop: 20,
  },
})