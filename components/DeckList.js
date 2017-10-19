import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Deck from './Deck';
import {List, ListItem} from 'react-native-elements';
import {neutral, white, black, carbon, drose} from '../utils/colors';
import {getDecks} from '../actions';
import { getDecksAPI } from "../utils/api";

class DeckList extends Component {
	
	async componentDidMount() {
		const {dispatch} = this.props;
		const data = await getDecksAPI();
		console.log(data)
		dispatch(getDecks(JSON.parse(data)));
	}

	render() {		
		if (!this.props.decks) {
			return (
				<View style={styles.container}>
					<Text style={styles.warning}>No decks found</Text>
				</View>)
		}
		return (			
			<List>
				{Object.keys(this.props.decks).map(deck => (
					<ListItem
						key={deck}
						onPress={() =>
							this.props.navigation.navigate('Deck', {
								deckTitle: this.props.decks[deck].title,
							})}
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
	warning: {
		fontSize: 18,
	},
});

export default connect(state => state)(DeckList);
