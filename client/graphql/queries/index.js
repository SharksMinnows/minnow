import { gql } from 'apollo-boost';

const queryEveryUser = gql`
  {
    everyUser {
      id
      oauthType
      username
    }
  }
`

const queryEveryGame = gql`
  {
    everyGame {
      id
      dateStamp
    }
  }
`

const queryGameById = gql`
  query(Game: ID) {
    Game(Game: Game) {
      id
      dateStamp
    }
  }
`

const queryEveryScore = gql`
  {
    everyScore {
      id
      gameId
      userId
      place
      minnowsEaton
      roundsCompleted
      time
    }
  }
`

const queryScoreById = gql`
  query(Score: ID) {
    Score(Score: Score) {
      id
      gameId
      userId
      place
      minnowsEaton
      roundsCompleted
      time
    }
  }
`

export { queryEveryUser, queryEveryGame, queryGameById , queryEveryScore, queryScoreById };