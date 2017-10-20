import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import {addQuestion} from '../actions';
import {sunshine, white, gray} from '../utils/colors';
import {MaterialIcons} from '@expo/vector-icons';

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
			<KeyboardAvoidingView style={styles.container}>
				<Text style={styles.formTitle}>Question</Text>
				<View style={styles.formContainer}>
					<TextInput
						style={styles.form}
						placeholder="Question"
						autoGrow={true}
						value={this.state.question}
						onChangeText={question => this.setState({question: question})}
					/>
				</View>
				<Text style={styles.formTitle}>Answer</Text>
				<View style={styles.formContainer}>
					<TextInput
						style={styles.form}
						placeholder="Answer"
						autoGrow={true}
						value={this.state.answer}
						onChangeText={answer => this.setState({answer})}
					/>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={this.saveQuestion.bind(this)}
					title="SUBMIT"
				>
					<MaterialIcons name="done" size={20} color={white} />
					<Text style={styles.buttonText}>SUBMIT</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	form: {
		flex: 1,
		margin: 20,
		height: 50,
		fontSize: 18,
		fontWeight: 'bold',
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
	formTitle: {
		fontSize: 20,
	},
	formContainer: {
		height: 40,
		margin: 30,
		flexDirection: 'row',
	},
});

export default connect(state => state)(AddQuestion);
