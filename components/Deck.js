import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

class Deck extends Component {
	render() {
		return <Text>Deck</Text>;
	}
}

export default connect()(Deck);
