const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const { Query, Mutation } = require('./schema')

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: Query,
})

const mutation = new GraphQLObjectType({
  name: 'Mutation', 
  fields: Mutation,
})

module.exports = new GraphQLSchema({ query, mutation })