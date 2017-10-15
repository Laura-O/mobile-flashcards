import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import Deck from './Deck'

class DeckList extends Component {	
	
	render() {
		const decks = Object.keys(this.props.decks);				
		{console.log(this.props.decks['JavaScript'])}

		if (!decks) {
			<Text>No decks found</Text>;
		}
		return (			
			<View>				
				{decks.map(deck => (
					<Deck key={deck} deck={this.props.decks[deck]} />
				))}
			</View>
		);
	}
}

export default connect(state => state)(DeckList);
