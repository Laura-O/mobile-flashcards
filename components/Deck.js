import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Divider, Button, Badge} from 'react-native-elements';
import {purple, lavender,white, aqua, black, sunshine, drose, gray} from '../utils/colors';

class Deck extends Component {
	render() {
		const {decks, navigation} = this.props;
		const title = navigation.state.params.deckTitle;
		const deck = decks[navigation.state.params.deckTitle];
		console.log(deck.questions)
				

		return (
			<View style={styles.container}>
				<Text style={styles.title}>{deck.title}</Text>
				<Divider style={{height: 30, backgroundColor: sunshine}} />				
				{(deck.questions.length === 0) ?
				<Text style={styles.warning}>Please add questions to your set!</Text>
				: <Badge containerStyle={{backgroundColor: aqua}}>
					<Text>{deck.questions.length} Questions</Text>
				</Badge>
				 }
					<View style={styles.buttons}>
						{(deck.questions.length === 0) ?				
					<Button
						large
						backgroundColor={gray}
						icon={{name: 'question-answer'}}						
						buttonStyle={{borderRadius: 20, width: 200, margin: 20}}
						title="Not available"
					/> : 
					<Button
						large
						backgroundColor={sunshine}
						icon={{name: 'question-answer'}}
						onPress={() => navigation.navigate('Quiz', {deck: deck})}
						buttonStyle={{borderRadius: 20, width: 200, margin: 20}}
						title="Start quiz"
					/>
					}
					<Button
						large
						icon={{name: 'add-circle-outline'}}
						backgroundColor={sunshine}
						onPress={() =>
							navigation.navigate('AddQuestion', {deck: deck.title})}
						buttonStyle={{borderRadius: 20, width: 200}}
						title="Add question"
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
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
		color: black,
	},
	buttons: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonStyle: {
		color: drose,
	},
	warning: {
		color: lavender,
		fontSize: 20,
		marginTop: 20,
	}
});

export default connect(state => state)(Deck);
