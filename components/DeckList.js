import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Deck from './Deck';
import {white, black, drose} from '../utils/colors';
import {getDecks} from '../actions';
import {getDecksAPI} from '../utils/api';

class DeckList extends Component {
	async componentDidMount() {
		const {dispatch} = this.props;
		const data = await getDecksAPI();
		dispatch(getDecks(JSON.parse(data)));
	}

	render() {
		if (!this.props.decks) {
			return (
				<View style={styles.container}>
					<Text style={styles.warning}>No decks found</Text>
				</View>
			);
		}
		return (
			<View>
				{Object.keys(this.props.decks).map(deck => (
					<View key={deck} style={styles.deck}>
						<TouchableOpacity
							style={styles.button}
							onPress={() =>
								this.props.navigation.navigate('Deck', {
									deckTitle: this.props.decks[deck].title,
								})}
						>
							<Text style={styles.title}>{this.props.decks[deck].title}</Text>
						</TouchableOpacity>
					</View>
				))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	deck: {
		backgroundColor: drose,		
		borderRadius: 2,
		justifyContent: 'center',		
		marginTop: 20,
	},
	warning: {
		fontSize: 18,
	},
	button: {
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
	}
});

export default connect(state => state)(DeckList);
