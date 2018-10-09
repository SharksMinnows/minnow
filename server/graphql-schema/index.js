const graphql = require('graphql');

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
	fields: () => ({
		id: { type: GraphQLString },
		everyRelatedScore: {
			type: new GraphQLList(ScoreType),
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = `SELECT * FROM Score WHERE userId = ${parent.id}`;
				// 	con.query(sql, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		id: { type: GraphQLString },
		oauthType: { type: GraphQLString },
		username: { type: GraphQLString }
	})
});

const GameType = new GraphQLObjectType({
	name: 'Game',
	fields: () => ({
		id: { type: GraphQLID },
		everyRelatedScore: {
			type: new GraphQLList(ScoreType),
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = `SELECT * FROM Score WHERE gameId = ${parent.id}`;
				// 	con.query(sql, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		dateStamp: { type: GraphQLString }
	})
});

const ScoreType = new GraphQLObjectType({
	name: 'Score',
	fields: () => ({
		id: { type: GraphQLID },
		gameId: { type: GraphQLString },
		relatedGame: {
			type: GameType,
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = `SELECT * FROM Game WHERE id = ${parent.gameId}`;
				// 	con.query(sql, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		userId: { type: GraphQLString },
		relatedUser: {
			type: UserType,
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = `SELECT * FROM User WHERE id = ${parent.userId}`;
				// 	con.query(sql, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		place: { type: GraphQLString },
		minnowsEaten: { type: GraphQLString },
		roundsCompleted: { type: GraphQLInt },
		time: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		everyUser: {
			type: new GraphQLList(UserType),
			resolve() {
				// getConnection((err, con) => {
				// 	const sql = 'SELECT * FROM User';
				// 	con.query(sql, (err, results) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return results;
				// 	})
				// })
			}
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = `SELECT * FROM User WHERE id = ${args.id}`;
				// 	con.query(sql, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		everyGame: {
			type: new GraphQLList(GameType),
			resolve() {
				// getConnection((err, con) => {
				// 	const sql = 'SELECT * FROM Game';
				// 	con.query(sql, (err, results) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return results;
				// 	})
				// })
			}
		},
		game: {
			type: GameType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = `SELECT * FROM Game WHERE id = ${args.id}`;
				// 	con.query(sql, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		everyScore: {
			type: new GraphQLList(ScoreType),
			resolve() {
				// getConnection((err, con) => {
				// 	const sql = 'SELECT * FROM Score';
				// 	con.query(sql, (err, results) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return results;
				// 	})
				// })
			}
		},
		score: {
			type: ScoreType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = `SELECT * FROM Score WHERE id = ${args.id}`;
				// 	con.query(sql, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				id: { type: new GraphQLNonNull(GraphQLString) },
				oauthType: { type: new GraphQLNonNull(GraphQLString) },
				username: { type: GraphQLString }
			},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = 'INSERT INTO User SET ?';
				// 	con.query(sql, args, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		updateUser: {
			type: UserType,
			args: {
				id: { type: GraphQLString },
				id: { type: GraphQLString },
				oauthType: { type: GraphQLString },
				username: { type: GraphQLString }
			},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	let updateValues = '';
				// 	for (const prop in args) {
				// 		updateValues += `${prop} = '${args[prop]}' `
				// 	}
				// 	const sql = `UPDATE User SET ${updateValues}WHERE id = ${args.id}`;
				// 	con.query(sql, args, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		deleteUser: {
			type: UserType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = `DELETE FROM User WHERE id = ${args.id}`;
				// 	con.query(sql, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		addGame: {
			type: GameType,
			args: {
				id: { type: GraphQLID },
				dateStamp: { type: GraphQLString }
			},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = 'INSERT INTO Game SET ?';
				// 	con.query(sql, args, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		updateGame: {
			type: GameType,
			args: {
				id: { type: GraphQLID },
				dateStamp: { type: GraphQLString }
			},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	let updateValues = '';
				// 	for (const prop in args) {
				// 		updateValues += `${prop} = '${args[prop]}' `
				// 	}
				// 	const sql = `UPDATE Game SET ${updateValues}WHERE id = ${args.id}`;
				// 	con.query(sql, args, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		deleteGame: {
			type: GameType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = `DELETE FROM Game WHERE id = ${args.id}`;
				// 	con.query(sql, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		addScore: {
			type: ScoreType,
			args: {
				id: { type: GraphQLID },
				gameId: { type: new GraphQLNonNull(GraphQLString) },
				userId: { type: GraphQLString },
				place: { type: GraphQLString },
				minnowsEaten: { type: GraphQLString },
				roundsCompleted: { type: GraphQLInt },
				time: { type: GraphQLString }
			},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = 'INSERT INTO Score SET ?';
				// 	con.query(sql, args, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		},
		updateScore: {
			type: ScoreType,
			args: {
				id: { type: GraphQLID },
				gameId: { type: GraphQLString },
				userId: { type: GraphQLString },
				place: { type: GraphQLString },
				minnowsEaten: { type: GraphQLString },
				roundsCompleted: { type: GraphQLInt },
				time: { type: GraphQLString }
			},
			resolve(parent, args) {
			// 	getConnection((err, con) => {
			// 		let updateValues = '';
			// 		for (const prop in args) {
			// 			updateValues += `${prop} = '${args[prop]}' `
			// 		}
			// 		const sql = `UPDATE Score SET ${updateValues}WHERE id = ${args.id}`;
			// 		con.query(sql, args, (err, result) => {
			// 			if (err) throw err;
			// 			con.release();
			// 			return result;
			// 		})
			// 	})
			}
		},
		deleteScore: {
			type: ScoreType,
			args: { id: { type: GraphQLID }},
			resolve(parent, args) {
				// getConnection((err, con) => {
				// 	const sql = `DELETE FROM Score WHERE id = ${args.id}`;
				// 	con.query(sql, (err, result) => {
				// 		if (err) throw err;
				// 		con.release();
				// 		return result;
				// 	})
				// })
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});