import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

class DeckList extends Component {
	render() {
		const decks = Object.keys(this.props.decks);		

		if (!decks) {
			<Text>No decks found</Text>;
		}
		return (
			<View>
				{decks.map(deck => (
					<Text key={deck} deck={this.props.decks[deck]}>{deck}</Text>					
				))}
			</View>
		);
	}
}

export default connect(state => state)(DeckList);
