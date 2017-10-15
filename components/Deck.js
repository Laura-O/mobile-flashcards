import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {purple, white} from '../utils/colors';

const Deck = ({navigation}) => {
	const {deck} = navigation.state.params;

	return (
		<View style={styles.container}>
			<Text style={styles.deck}>{deck.title}</Text>
			<Text>{deck.questions.length} Questions</Text>
			<TouchableOpacity style={styles.btnContainer}
				onPress={() => navigation.navigate(
					'Quiz',
					{deck: deck}
				)}>
				<Text style={styles.btnTitle}>Start quiz</Text>
			</TouchableOpacity>
			<TouchableOpacity
				 style={styles.btnContainer}
				 onPress={() => navigation.navigate(
					 'AddQuestion',
					 {deck: deck}
				 )}
			 >
				 <Text style={styles.btnTitle}>Add question to deck</Text>
			 </TouchableOpacity>
		</View>
	);
};

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
	title: {
		fontSize: 40,
	},
	btnContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',				
		marginTop: 15,
		width: 250,
		maxHeight: 50,
	},
	btnTitle: {
		fontSize: 20,
		marginTop: 10,
	},
});

export default connect(state => state)(Deck);
