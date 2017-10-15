import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

class Quiz extends Component {
	render() {
		return <Text>Quiz</Text>;
	}
}

export default connect()(Quiz);
