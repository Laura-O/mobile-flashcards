import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Question from './Question.js';
import {sunshine, aqua, drose, white} from '../utils/colors';
import { FontAwesome, Entypo } from '@expo/vector-icons'
import {
	clearLocalNotification,
	setLocalNotification,
} from '../utils/notifications';

class Quiz extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			title: 'Quiz: ' + navigation.state.params.deck.title,
		};
	};

	state = {
		index: 0,
		score: 0,
		allAsked: false,
	};

	evaluateAnswer = (correct = false) => {
		const questions = this.props.navigation.state.params.deck.questions;
		let {score, index, allAsked} = this.state;

		score = correct ? score + 1 : score;
		index++;
		allAsked = index === questions.length;
		this.setState({index, score, allAsked});

		if (allAsked) {
			clearLocalNotification().then(setLocalNotification);
		}
	};

	resetQuiz = () => {
		this.setState({index: 0, score: 0, done: false});
		this.props.navigation.navigate('Quiz', {
			deck: this.props.navigation.state.params.deck,
		});
	};

	back = () => {
		this.props.navigation.navigate('Deck', {
			deckTitle: this.props.navigation.state.params.deck.title,
		});
	};

	render() {
		const deck = this.props.navigation.state.params.deck;
		const questions = this.props.navigation.state.params.deck.questions;
		const {index, score, allAsked} = this.state;

		if (!questions) {
			return (
				<View style={styles.container}>
					<Text>No questions available</Text>
				</View>
			);
		}

		if (this.state.allAsked) {
			return (
				<View style={styles.container}>
					<Text style={styles.result}>
						Result: {Math.floor(score / questions.length * 100)}% Correct
					</Text>
					<TouchableOpacity						
						style={styles.button}						
						onPress={() => {
							this.resetQuiz();
						}}
						>
					<Text style={styles.buttonText}>Restart Quiz</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}						
						onPress={() => {
							this.back();
						}}						
					>
					<Text style={styles.buttonText}>Back to deck</Text>
				</TouchableOpacity>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<Question card={questions[index]} handleAnswer={this.evaluateAnswer} />
				<View style={styles.infoBox}>					
						<Text style={styles.remainingText}>
							Question {index + 1} of {questions.length}
						</Text>					
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
	},
	result: {
		fontSize: 18,
		marginTop: 40,
	},
	buttons: {
		color: aqua,
	},
	infoBox: {
		marginBottom: 20,
	},
	remainingText: {
		fontSize: 18,
	},
	button: {
		alignItems: 'center',
		flexDirection: 'row',
		borderRadius: 20,
		width: 200,
		height: 40,
		backgroundColor: sunshine,
		justifyContent: 'center',
		margin: 20,
	},
	buttonText: {
		marginLeft: 5,
		color: white,		
	},
});

export default connect(state => state)(Quiz);
