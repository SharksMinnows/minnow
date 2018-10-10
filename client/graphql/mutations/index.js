import { gql } from 'apollo-boost';

const addUserMutation = gql`
  mutation($id: String!, $oauthType: String!, $username: String!) {
    addUser(id: $id, oauthType: $oauthType, username: $username) {
      id
      oauthType
      username
    }
  }
`

const addGameMutation = gql`
  mutation($dateStamp: String) {
    addGame(dateStamp: $dateStamp) {
      id
      dateStamp
    }
  }
`

const updateGameMutation = gql`
  mutation($dateStamp: String) {
    updateGame(dateStamp: $dateStamp) {
      id
      dateStamp
    }
  }
`

const deleteGameMutation = gpq`
  mutation($id: ID!){
    deleteGame(id: $id){
      id
      dateStamp
    }
  }
`

const addScoreMutation = gql`
  mutation($gameId: String!, $userId: String!, $place: String, $minnowsEaton: Number, $roundsCompleted: Number, $time: String) {
    addScore(gameId: $gameId, userId: $userId, place: $place, minnowsEaton: $minnowsEaton, roundsCompleted: $roundsCompleted, time: $time) {
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

const updateScoreMutation = gql`
  mutation($gameId: String!, $userId: String!, $place: String, $minnowsEaton: Number, $roundsCompleted: Number, $time: String) {
    updateScore(gameId: $gameId, userId: $userId, place: $place, minnowsEaton: $minnowsEaton, roundsCompleted: $roundsCompleted, time: $time) {
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

const deleteScoreMutation = gpq`
  mutation($id: ID!){
    deleteScore(id: $id){
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

export {
  addUserMutation,
  addGameMutation,
  updateGameMutation,
  deleteGameMutation,
  addScoreMutation,
  updateScoreMutation,
  deleteScoreMutation,
};