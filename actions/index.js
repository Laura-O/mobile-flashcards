export const CREATE_DECK = "CREATE_DECK";
export const ADD_QUESTION = "ADD_QUESTION";

export function createDeck(title) {
  return {
    type: CREATE_DECK,
    title
  };
}

export function addQuestion(id, question) {
  return {
    type: ADD_QUESTION,
    id,
    question
  };
}