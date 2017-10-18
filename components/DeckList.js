import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity,} from 'react-native';
import {connect} from 'react-redux';
import Deck from './Deck';
import { List, ListItem } from 'react-native-elements'
import {neutral, white, black, carbon, drose} from '../utils/colors';

class DeckList extends Component {
	render() {
		const decks = Object.keys(this.props.decks);		
		
		if (!decks) {
			<Text>No decks found</Text>;
		}
		return (
			<List>
				{decks.map(deck => (
					<ListItem						
						key={deck}
						onPress={() => this.props.navigation.navigate(
              'Deck',
              {deckTitle: this.props.decks[deck].title},
            )}						
					title={this.props.decks[deck].title}
				/>		
				))}
			</List>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: white,
	},
	deck: {
		backgroundColor: drose,
		color: black,
		borderRadius: 2,
		justifyContent: 'center',
		fontSize: 32,
		textAlign: 'center',
		marginTop: 20,
	},
});

export default connect(state => state)(DeckList);
