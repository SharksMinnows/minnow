import { gql } from 'apollo-boost';

const queryEveryUser = gql`
	{
		users {
			id
			id
			oauthType
			username
		}
	}
`

const queryUserById = gql`
	query($id: ID) {
		user(id: $id) {
			id
			id
			oauthType
			username
		}
	}
`

const queryEveryGame = gql`
	{
		games {
			id
			dateStamp
		}
	}
`

const queryGameById = gql`
	query($id: ID) {
		game(id: $id) {
			id
			dateStamp
		}
	}
`

const queryEveryScore = gql`
	{
		scores {
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

const queryScoreById = gql`
	query($id: ID) {
		score(id: $id) {
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

export { queryEveryUser, queryUserById , queryEveryGame, queryGameById , queryEveryScore, queryScoreById };