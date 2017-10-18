import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
	Button,
	FormLabel,
	FormInput,
	FormValidationMessage,
} from 'react-native-elements';
import {addQuestion} from '../actions';

class AddQuestion extends Component {
	state = {
		question: '',
		answer: '',
	};

	saveQuestion = () => {
		const deckTitle = this.props.navigation.state.params.deck;
		const {question, answer} = this.state;		
		this.props.dispatch(addQuestion(deckTitle, {question, answer}));
		this.props.navigation.goBack();
	};

	render() {
		return (
			<View>
				<View>
					<FormLabel>Question</FormLabel>
					<FormInput
						placeholder="Question"
						value={this.state.question}
						onChangeText={question => this.setState({question: question})}
					/>
					<FormLabel>Answer</FormLabel>
					<FormInput
						placeholder="Answer"
						value={this.state.answer}
						onChangeText={answer => this.setState({answer})}
					/>
					<Button
						onPress={this.saveQuestion.bind(this)}
						icon={{name: 'done'}}
						buttonStyle={{marginTop: 15}}
						title="SUBMIT"
					/>
				</View>
			</View>
		);
	}
}

export default connect(state => state)(AddQuestion);
