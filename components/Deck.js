import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Divider, Button, Badge} from 'react-native-elements';
import {purple, white, aqua, black, sunshine, drose} from '../utils/colors';

class Deck extends Component {
	
	render() {
		const { decks, navigation } = this.props;
		const deck = decks[navigation.state.params.deckTitle];		
		
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{deck.title}</Text>
				<Divider style={{height: 30, backgroundColor: sunshine}} />
				<Badge containerStyle={{ backgroundColor: aqua}}>
					<Text>{deck.questions.length} Questions</Text>
				</Badge>
				<View style={styles.buttons}>
					<Button
						large
						backgroundColor={sunshine}
						icon={{name: 'question-answer'}}
						onPress={() => navigation.navigate('Quiz', {deck: deck})}
						buttonStyle={{borderRadius: 20, width: 200, margin: 20}}
						title="Start quiz"
					/>
					<Button
						large
						icon={{name: 'add-circle-outline'}}
						backgroundColor={sunshine}
						onPress={() => navigation.navigate('AddQuestion', {deck: deck})}
						buttonStyle={{borderRadius: 20, width: 200}}
						title="Add question"
					/>
				</View>
			</View>
		);
	}
};

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
});

export default connect(state => state)(Deck);
