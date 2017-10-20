import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {sunshine, white} from '../utils/colors';
import {MaterialIcons, Entypo} from '@expo/vector-icons';

class Question extends Component {
	state = {
		showAnswer: false,
	};

	checkAnswer = () => {
		this.setState({showAnswer: !this.state.showAnswer});
	};

	render() {
		if (this.state.showAnswer) {
			return (
				<View style={styles.container}>
					<View style={styles.card}>
							<Text style={styles.question}>{this.props.card.answer}</Text>

							<TouchableOpacity
								style={styles.button}
								backgroundColor={sunshine}
								icon={{name: 'thumb-up'}}
								onPress={() => {
									this.checkAnswer();
									this.props.handleAnswer(true);
								}}
							>
								<MaterialIcons name="thumb-up" color={white} size={20} />
								<Text style={styles.buttonText}>Correct</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.button}								
								onPress={() => {
									this.checkAnswer();
									this.props.handleAnswer(false);
								}}
							>
								<MaterialIcons name="thumb-down" color={white} size={20} />
								<Text style={styles.buttonText}>Incorrect</Text>
							</TouchableOpacity>						
					</View>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<Text style={styles.question}>{this.props.card.question}</Text>
					<TouchableOpacity
						onPress={this.checkAnswer}
						style={styles.button}
						icon={{name: 'visibility'}}
					>
						<Entypo name="eye" color={white} size={20} />
						<Text style={styles.buttonText}>Show Answer</Text>
					</TouchableOpacity>
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
		marginLeft: 30,
		marginRight: 30,
	},
	card: {
		backgroundColor: white,
		padding: 20,
		alignItems: 'center',
	},
	title: {
		fontSize: 32,
	},
	question: {
		fontSize: 30,
	},
	buttons: {
		flex: 1,
		flexDirection: 'row',
		flex: 8,
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
	}
});

export default connect(state => state)(Question);
