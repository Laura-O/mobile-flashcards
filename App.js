import React from 'react';
import {StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import reducer from './reducers';
import DeckList from './components/DeckList';
import CreateDeck from './components/CreateDeck';
import AddQuestion from './components/AddQuestion';
import Quiz from './components/Quiz';
import Deck from './components/Deck';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {Constants} from 'expo';
import {setLocalNotification} from './utils/notifications';
import {
	aqua,
	lavender,
	white,
	sky,
	black,
	watermelon,
	carbon,
} from './utils/colors';

const store = createStore(reducer);

function CardStatusBar({backgroundColor, ...props}) {
	return (
		<View style={{backgroundColor, height: Constants.statusBarHeight}}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);
}

const Tabs = TabNavigator(
	{
		DeckList: {
			screen: DeckList,
			navigationOptions: {
				tabBarLabel: 'DeckList',
				tabBarIcon: ({tintColor}) => (
					<Ionicons name="ios-bookmarks" size={30} color={tintColor} />
				),
			},
		},
		CreateDeck: {
			screen: CreateDeck,
			navigationOptions: {
				tabBarLabel: 'Add Entry',
				tabBarIcon: ({tintColor}) => (
					<FontAwesome name="plus-square" size={30} color={tintColor} />
				),
			},
		},
	},
	{
		navigationOptions: {
			header: null,
		},
		tabBarOptions: {
			activeTintColor: Platform.OS === 'ios' ? purple : black,
			inactiveTintColor: black,
			style: {
				height: 56,
				backgroundColor: aqua,
				shadowOffset: {
					width: 0,
					height: 3,
				},
				shadowRadius: 6,
				shadowOpacity: 1,
			},
			indicatorStyle: {backgroundColor: lavender},
		},
	}
);

const MainNavigator = StackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {title: 'UdaciCards'},
	},
	AddQuestion: {
		screen: AddQuestion,
	},
	DeckList: {
		screen: DeckList,
	},
	Deck: {
		screen: Deck,
	},
	Quiz: {
		screen: Quiz,
	},
});

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification();
	}

	render() {
		return (
			<Provider store={store}>
				<View style={{flex: 1}}>
					<CardStatusBar />
					<MainNavigator />
				</View>
			</Provider>
		);
	}
}
