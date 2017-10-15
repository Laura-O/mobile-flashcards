import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux';
import Deck from './Deck';
import {purple, white} from '../utils/colors';

class DeckList extends Component {
	render() {
		const decks = Object.keys(this.props.decks);		
		
		if (!decks) {
			<Text>No decks found</Text>;
		}
		return (
			<View>
				{decks.map(deck => (
					<TouchableOpacity
						key={deck}
						onPress={() => this.props.navigation.navigate(
              'Deck',
              {deck: this.props.decks[deck]}
            )}
						>
					<Text key={deck} style={styles.deck}>
						{this.props.decks[deck].title}
					</Text>
					</TouchableOpacity>
				))}
			</View>
		);
	}
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
});

export default connect(state => state)(DeckList);
