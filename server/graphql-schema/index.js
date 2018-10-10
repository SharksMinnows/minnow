const graphql = require('graphql');
import joinMonster from 'join-monster';
import knex from '../db/knex_pool.js';

const { 
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString, 
  GraphQLInt, 
  GraphQLList,
  GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
	name: 'User',
	sqlTable: 'users',
	uniqueKey: 'id',
	fields: () => ({
    id: { type: GraphQLString },
    everyRelatedScore: {
      type: ScoreType,
			sqlJoin(userTable, scoreTable) {
				return `${userTable}.id = ${scoreTable}.userId`
			}
		},
    oauthType: { type: GraphQLString },
    username: { type: GraphQLString }
	})
});

const GameType = new GraphQLObjectType({
	name: 'Game',
	sqlTable: 'games',
	uniqueKey: 'id',
	fields: () => ({
    id: { type: GraphQLID },
    everyRelatedScore: {
      type: ScoreType,
			sqlJoin(gameTable, scoreTable) {
				return `${gameTable}.id = ${scoreTable}.gameId`
			}
		},
    dateStamp: { type: GraphQLString }
	})
});

const ScoreType = new GraphQLObjectType({
	name: 'Score',
	sqlTable: 'scores',
	uniqueKey: 'id',
	fields: () => ({
    id: { type: GraphQLID },
    gameId: { type: GraphQLString },
    everyRelatedGame: {
      type: GameType,
			sqlJoin(scoreTable, gameTable) {
				return `${scoreTable}.gameId = ${gameTable}.id`
			}
		},
    userId: { type: GraphQLString },
    everyRelatedUser: {
      type: UserType,
			sqlJoin(scoreTable, userTable) {
				return `${scoreTable}.userId = ${userTable}.id`
			}
		},
    place: { type: GraphQLString },
    minnowsEaton: { type: GraphQLInt },
    roundsCompleted: { type: GraphQLInt },
    time: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		everyUser: {
			type: new GraphQLList(UserType),
			resolve: (parent, args, context, resolveInfo) => {
				return joinMonster(resolveInfo, context, sql => {
					return knex.raw(sql)
				})
      }
    },
		user: {
			type: UserType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) }},
			where: (userTable, args, context) => {
				if (args.id) return `${userTable}.id = ${args.id}`
			},
			resolve: (parent, args, context, resolveInfo) => {
				return joinMonster(resolveInfo, context, sql => {
					return knex.raw(sql)
				})
			}
		},
		everyGame: {
			type: new GraphQLList(GameType),
			resolve: (parent, args, context, resolveInfo) => {
				return joinMonster(resolveInfo, context, sql => {
					return knex.raw(sql)
				})
      }
    },
		game: {
			type: GameType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) }},
			where: (gameTable, args, context) => {
				if (args.id) return `${gameTable}.id = ${args.id}`
			},
			resolve: (parent, args, context, resolveInfo) => {
				return joinMonster(resolveInfo, context, sql => {
					return knex.raw(sql)
				})
			}
		},
		everyScore: {
			type: new GraphQLList(ScoreType),
			resolve: (parent, args, context, resolveInfo) => {
				return joinMonster(resolveInfo, context, sql => {
					return knex.raw(sql)
				})
      }
    },
		score: {
			type: ScoreType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) }},
			where: (scoreTable, args, context) => {
				if (args.id) return `${scoreTable}.id = ${args.id}`
			},
			resolve: (parent, args, context, resolveInfo) => {
				return joinMonster(resolveInfo, context, sql => {
					return knex.raw(sql)
				})
			}
		}
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        oauthType: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return knex('users').insert(args)
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        oauthType: { type: GraphQLString },
        username: { type: GraphQLString }
      },
      resolve(parent, args) {
        return knex('users').where('id', '=', args.id).update(args)
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return knex('users').where('id', '=', args.id).del()
      }
    },
    addGame: {
      type: GameType,
      args: {
        id: { type: GraphQLID },
        dateStamp: { type: GraphQLString }
      },
      resolve(parent, args) {
        return knex('games').insert(args)
      }
    },
    updateGame: {
      type: GameType,
      args: {
        id: { type: GraphQLID },
        dateStamp: { type: GraphQLString }
      },
      resolve(parent, args) {
        return knex('games').where('id', '=', args.id).update(args)
      }
    },
    deleteGame: {
      type: GameType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return knex('games').where('id', '=', args.id).del()
      }
    },
    addScore: {
      type: ScoreType,
      args: {
        id: { type: GraphQLID },
        gameId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        place: { type: GraphQLString },
        minnowsEaton: { type: GraphQLInt },
        roundsCompleted: { type: GraphQLInt },
        time: { type: GraphQLString }
      },
      resolve(parent, args) {
        return knex('scores').insert(args)
      }
    },
    updateScore: {
      type: ScoreType,
      args: {
        id: { type: GraphQLID },
        gameId: { type: GraphQLString },
        userId: { type: GraphQLString },
        place: { type: GraphQLString },
        minnowsEaton: { type: GraphQLInt },
        roundsCompleted: { type: GraphQLInt },
        time: { type: GraphQLString }
      },
      resolve(parent, args) {
        return knex('scores').where('id', '=', args.id).update(args)
      }
    },
    deleteScore: {
      type: ScoreType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return knex('scores').where('id', '=', args.id).del()
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});