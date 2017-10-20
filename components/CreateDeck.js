import React, {Component} from 'react';
import {Text, View, StyleSheet, Keyboard, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {sunshine, lavender, white} from '../utils/colors';
import {createDeck} from '../actions';
import {MaterialIcons} from '@expo/vector-icons';

class CreateDeck extends Component {
	state = {
		title: '',
		empty: true,
	};

	onChangeTitle = title => {
		this.setState({title: title});
		{
			title.length > 0
				? this.setState({empty: false})
				: this.setState({empty: true});
		}
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
			<View style={styles.container}>
				<Text style={styles.formTitle}>Name</Text>
				<View style={styles.formContainer}>
				<TextInput
					style={styles.form}					
					value={this.state.title}
					onChangeText={this.onChangeTitle}
				/>
			</View>
				{this.state.empty && (
					<Text style={styles.warning}>Please enter a name</Text>
				)}
				<TouchableOpacity					
					style={styles.button}
					onPress={this.onSubmit.bind(this)}
					disabled={this.state.empty ? true : false}
					icon={{name: 'done'}}
					>
						<MaterialIcons name="done" size={20} color={white} />
				<Text style={styles.buttonText}>SUBMIT</Text>
					</TouchableOpacity>				
			</View>
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
	warning: {
		color: lavender,
	}
});

export default connect()(CreateDeck);
