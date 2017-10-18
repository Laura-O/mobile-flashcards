import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Question from './Question.js';
import {Card, Divider, Button, Badge} from 'react-native-elements';
import {sunshine, aqua, drose} from '../utils/colors';
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
		this.props.navigation.goBack();
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
					<Text style={styles.title}>
						Result: {Math.floor(score / questions.length * 100)}% Correct
					</Text>
					<Button
						title="Restart Quiz"
						backgroundColor={sunshine}
						icon={{name: 'question-answer'}}
						onPress={() => {
							this.resetQuiz();
						}}
						buttonStyle={{
							borderRadius: 0.5,
							marginLeft: 0,
							marginRight: 0,
							marginTop: 20,
						}}
					/>
					<Button
						title="Back to deck"
						backgroundColor={sunshine}
						icon={{name: 'question-answer', buttonStyle: styles.buttons}}
						onPress={() => {
							this.back();
						}}
						buttonStyle={{
							borderRadius: 0.2,
							marginLeft: 0,
							marginRight: 0,
							marginTop: 20,
						}}
					/>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<Question card={questions[index]} handleAnswer={this.evaluateAnswer} />
				<View style={styles.infoBox}>
					<Badge containerStyle={{backgroundColor: drose}}>
						<Text>
							Question {index + 1} of {questions.length}
						</Text>
					</Badge>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	buttons: {
		color: aqua,
	},
	infoBox: {
		marginBottom: 20,
		fontSize: 18,
	},
});

export default connect(state => state)(Quiz);
