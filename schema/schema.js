const { GraphQLDateTime } = require('graphql-iso-date')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require('graphql')
const Tweet = require('../models/Tweet')
const Author = require('../models/Author')

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    codAuthor: { type: GraphQLID },
    nome: { type: GraphQLString },
    sobrenome: { type: GraphQLString },
    foto: { type: GraphQLString },
    tweets: {
      type: new GraphQLList(TweetType),
      resolve({ codAuthor }){
        return Tweet.find({ codAuthor })
      }
    }
  })
})

const TweetType = new GraphQLObjectType({
  name: 'Tweet',
  fields: () => ({
    codTweet: { type: GraphQLID },
    texto: { type: GraphQLString },
    likes: { type: GraphQLInt },
    data_publicacao: { type: GraphQLDateTime },
    author: {
      type: AuthorType,
      resolve({ codAuthor }){
        return Author.findOne({ codAuthor });
      }
    }
  })
});

exports.Query = {
  tweet: {
    type: TweetType,
    args: { codTweet: { type: GraphQLID } },
    resolve(_, { codTweet }){
      return Tweet.findOne({ codTweet });
    }
  },
  tweets: {
    type: new GraphQLList(TweetType),
    resolve(){
      return Tweet.find();
    }
  },
  author: {
    type: AuthorType,
    args: { codAuthor: { type: GraphQLID } },
    resolve(_, { codAuthor }){
      return Author.findOne({ codAuthor });
    }
  },  
  authors: {
    type: new GraphQLList(AuthorType),
    resolve(){
      return Author.find();
    }
  }
}

exports.Mutation = {
  addTweet: {
    type: TweetType,
    args: {
      texto: { type: GraphQLString },
      codAuthor: { type: GraphQLString },
    },
    resolve(_, args){
      const tweet = new Tweet(args)
      return tweet.save()
    }
  },
  likeTweet: {
    type: TweetType,
    args: {
      codTweet: { type: GraphQLString },
    },
    resolve(_, args){
      return Tweet.findOneAndUpdate(args, { $inc:{ likes: 1 } }, { new: true })
    }
  },
  addAuthor: {
    type: AuthorType,
    args: {
      nome: { type: GraphQLString },
      sobrenome: { type: GraphQLString },
      foto: { type: GraphQLString },
    },
    resolve(_, args){
      const author = new Author(args)
      return author.save()
    }
  }
}
