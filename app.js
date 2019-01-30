const graphqlHTTP = require('express-graphql') // Importação do graphql
const express = require('express')() // Importação do express
const io = require('socket.io')() // Importação do socket.io
const cors = require('cors')

const database = require('./database')
const Tweet = require('./models/Tweet')
const Author = require('./models/Author')
const schema = require('./schema')
const port = process.env.PORT || 3001

express.use(cors())
express.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

database.then(() => {
  const server = express.listen(port, () => {
    io.attach(server)
    console.log(`Servidor iniciado! Na porta ${port}`)
  })
}).catch(() => process.exit(1))

// ========= ========= ========= ========= ========= ========= ========= ========= //

const sendData = async socket => {
  const listTweets = Tweet.find({}, { _id: 0, __v: 0 }).sort({ data_publicacao: -1 }).lean()
  const authorTweets = await Promise.all((await listTweets).map(async ({ codAuthor, ...tweet }) => {
    const usuario =  await Author.findOne({ codAuthor }, { _id: 0 }).select('nome sobrenome foto')
    return { ...tweet, usuario }
  }))
  socket.emit('tweets', authorTweets)
  console.log('\n\nTweets enviados - ', authorTweets)
}

io.on('connection', socket => {
  console.log('Requisição - ', new Date(), socket.id)

  // Retorna todos os tweets
  socket.on('getTweets', () => sendData(socket))
  
  // Insere um tweet
  socket.on('addTweet', async data => {
    const newTweet = new Tweet(data)
    await newTweet.save()
    console.log('\n\nUm tweet inserido - ', newTweet)
    sendData(io)
  })
  
  // Curte um tweet
  socket.on('likeTweet', async data => {
    const { codTweet } = data
    const tweet = await Tweet.findOneAndUpdate({ codTweet }, { $inc:{ likes: 1 } }, { new: true })
    console.log('\n\nUm tweet curtido - ', tweet)
    sendData(io)
  })

  // Insere um autor
  socket.on('addAuthor', async data => {
    const author = await Author.findOne(data)
    if (author) {
      socket.emit('author', author.codAuthor)
    } else {
      const newAuthor = new Author(data)
      await newAuthor.save()
      console.log('\n\nUm autor inserido - ', newAuthor)
      socket.emit('author', newAuthor.codAuthor)
    }
  })
})