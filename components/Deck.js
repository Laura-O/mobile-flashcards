import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {connect} from 'react-redux';
import {lavender, aqua, black, sunshine, drose, gray, white} from '../utils/colors';
import {Entypo, FontAwesome, MaterialIcons} from '@expo/vector-icons';

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

				{deck.questions.length === 0 ? (
					<Text style={styles.warning}>Please add questions to your set!</Text>
				) : (
					<TouchableOpacity style={{backgroundColor: aqua}}>
						<Text>{deck.questions.length} Questions</Text>
					</TouchableOpacity>
				)}
				<View style={styles.buttonArea}>
					{deck.questions.length === 0 ? (
						<TouchableOpacity
							style={styles.button}
							backgroundColor={gray}
							disabled={true}							
							icon={{name: 'question-answer'}}							
						>
							<MaterialIcons name={'error-outline'} size={20} color={white} />
							<Text style={styles.buttonTitle}>Not available</Text>
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={styles.button}
							onPress={() => navigation.navigate('Quiz', {deck: deck})}
						>
							<FontAwesome name={'question-circle-o'} size={20} color={white} />
							<Text style={styles.buttonTitle}>Start quiz</Text>
						</TouchableOpacity>
					)}
					<TouchableOpacity
						style={styles.button}
						onPress={() =>
							navigation.navigate('AddQuestion', {deck: deck.title})}
						buttonStyle={{borderRadius: 20, width: 200}}
					>
						<Entypo name={'squared-plus'} size={20} color={white} />
						<Text style={styles.buttonTitle}>Add Question</Text>
					</TouchableOpacity>
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
	buttonArea: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20,
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
	buttonTitle: {
		marginLeft: 5,
		color: white,		
	},
	warning: {
		color: lavender,
		fontSize: 20,
		marginTop: 20,
	},
});

export default connect(state => state)(Deck);
