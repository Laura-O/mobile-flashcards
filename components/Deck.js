import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import {Divider, Button, Badge} from 'react-native-elements';
import {lavender, aqua, black, sunshine, drose, gray} from '../utils/colors';

class Deck extends Component {
	state = {
		opacity: new Animated.Value(0),
	};

	componentWillMount() {
		const {opacity} = this.state;
		var self = this;
		Animated.timing(opacity, {toValue: 1, duration: 1000}).start();
	}

	render() {
		const {decks, navigation} = this.props;
		const title = navigation.state.params.deckTitle;
		const deck = decks[navigation.state.params.deckTitle];
		const {opacity} = this.state;

		return (
			<Animated.View style={[styles.container, {opacity}]}>
				<Text style={styles.title}>{deck.title}</Text>
				<Divider style={{height: 30, backgroundColor: sunshine}} />
				{deck.questions.length === 0 ? (
					<Text style={styles.warning}>Please add questions to your set!</Text>
				) : (
					<Badge containerStyle={{backgroundColor: aqua}}>
						<Text>{deck.questions.length} Questions</Text>
					</Badge>
				)}
				<View style={styles.buttons}>
					{deck.questions.length === 0 ? (
						<Button
							large
							backgroundColor={gray}
							icon={{name: 'question-answer'}}
							buttonStyle={{borderRadius: 20, width: 200, margin: 20}}
							title="Not available"
						/>
					) : (
						<Button
							large
							backgroundColor={sunshine}
							icon={{name: 'question-answer'}}
							onPress={() => navigation.navigate('Quiz', {deck: deck})}
							buttonStyle={{borderRadius: 20, width: 200, margin: 20}}
							title="Start quiz"
						/>
					)}
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
			</Animated.View>
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
	},
});

export default connect(state => state)(Deck);
