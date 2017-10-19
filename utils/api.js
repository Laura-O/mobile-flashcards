import {AsyncStorage} from 'react-native';

const STORAGE_KEY = 'flashcards:decks';

export function getDecksAPI() {
	return AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
		if (result === null) {
			return {decks: {}};
		}
		return JSON.parse(result);
	});
}

export function saveNewDeck(deckTitle) {
	return AsyncStorage.mergeItem(
		STORAGE_KEY,
		JSON.stringify({
			[deckTitle]: {
				title: deckTitle,
				questions: [],
			},
		})
	);
}

export function saveNewCard(id, card) {
	return AsyncStorage.getItem(STORAGE_KEY).then(result => {
		const data = JSON.parse(result);
		data[id].questions.push(card);
		AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	});
}
