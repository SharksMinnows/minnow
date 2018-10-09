import { gql } from 'apollo-boost';

const addUserMutation = gql`
	mutation($id: String!, $oauthType: String!, $username: String) {
		addBook(id: $id, oauthType: $oauthType, username: $username) {
			id
			id
			oauthType
			username
		}
	}
`

const addGameMutation = gql`
	mutation($dateStamp: String) {
		addBook(dateStamp: $dateStamp) {
			id
			dateStamp
		}
	}
`

const addScoreMutation = gql`
	mutation($gameId: String!, $userId: String, $place: String, $minnowsEaten: String, $roundsCompleted: Number, $time: String) {
		addBook(gameId: $gameId, userId: $userId, place: $place, minnowsEaten: $minnowsEaten, roundsCompleted: $roundsCompleted, time: $time) {
			id
			gameId
			userId
			place
			minnowsEaten
			roundsCompleted
			time
		}
	}
`

export { addUserMutation, addGameMutation, addScoreMutation };