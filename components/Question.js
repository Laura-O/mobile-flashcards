import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Divider, Button, Badge} from 'react-native-elements';
import {connect} from 'react-redux';
import {purple, white, sunshine} from '../utils/colors';

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
						<Card title="Answer">
							<Text style={styles.question}>{this.props.card.answer}</Text>

							<Button
								title="Correct"
								backgroundColor={sunshine}
								icon={{name: 'thumb-up'}}
								onPress={() => {
									this.checkAnswer();
									this.props.handleAnswer(true);
								}}
								buttonStyle={{
									borderRadius: 0.2,
									marginLeft: 0,
									marginRight: 0,
									marginTop: 20,
								}}
							/>
							<Button
								title="Wrong"
								backgroundColor={sunshine}
								icon={{name: 'thumb-down'}}
								onPress={() => {
									this.checkAnswer();
									this.props.handleAnswer(false);
								}}
								buttonStyle={{
									borderRadius: 0.2,
									marginLeft: 0,
									marginRight: 0,
									marginTop: 20,
								}}
							/>
						</Card>
					</View>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<Card title="Question">
						<Text style={styles.question}>{this.props.card.question}</Text>
						<Button
							onPress={this.checkAnswer}
							title="Show Answer"
							backgroundColor={sunshine}
							icon={{name: 'visibility'}}
							buttonStyle={{
								borderRadius: 0.2,
								marginLeft: 0,
								marginRight: 0,
								marginTop: 20,
							}}
						/>
					</Card>
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
		flex: 8,
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
});

export default connect(state => state)(Question);
