import React, {Component} from 'react';
import {Text, View, StyleSheet, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {purple, white} from '../utils/colors';
import {
	Button,
	FormLabel,
	FormInput,
	FormValidationMessage,
} from 'react-native-elements';
import {createDeck} from '../actions';

class CreateDeck extends Component {
	state = {
		title: '',
	};

	onChangeTitle = title => {
		this.setState({title: title});
	};

	onSubmit = () => {
		const {title} = this.state;

		this.setState({title: ''});
		this.props.dispatch(createDeck(title));
		Keyboard.dismiss();
		this.props.navigation.navigate('Deck', {deckTitle: title});
	};

	render() {
		const {title} = this.props;

		return (
			<View>
				<FormLabel>Name</FormLabel>
				<FormInput
					placeholder="Deck name"
					value={this.state.title}
					onChangeText={this.onChangeTitle}
				/>
				<Button
					onPress={this.onSubmit.bind(this)}
					icon={{name: 'done'}}
					buttonStyle={{marginTop: 15}}
					title="SUBMIT"
				/>
			</View>
		);
	}
}

export default connect()(CreateDeck);
