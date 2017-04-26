'use strict'

const fs   = require('fs') // Módulo de acesso à arquivos
const port = process.env.PORT || 3001
const io   = require('socket.io')(port) // Importação do socket.io e inicialização
console.log(`Servidor iniciado! Na porta ${port}`)

const Tweet = require('./model/tweet') // importação do modelo Tweet

io.on('connection', conectado)
function conectado(socket) {
  console.log('\nRequisição - ', new Date(), socket.id)

  // Retorna todos os tweets
  socket.on('pedirTweets', pedirTweets)
  function pedirTweets() {
    fs.readFile('./tweets.json', (err, tweets) => {
      let listaTweets = JSON.parse(tweets)
      socket.emit('todosTweets', listaTweets)
      console.log('\nTweets enviados - ', listaTweets)
    })
  }

  // Insere um tweet
  socket.on('novoTweet', novoTweet)
  function novoTweet(data) {
    let novoTweet = new Tweet(data)
    fs.readFile('./tweets.json', (err, tweets) => {
      let listaTweets = JSON.parse(tweets)
      listaTweets.push(novoTweet)
      fs.writeFile('./tweets.json', JSON.stringify(listaTweets, null, 2), (err) => {
        if (err) console.log(err)
        console.log('\nUm tweet inserido - ', novoTweet)
        io.emit('todosTweets', listaTweets)
      })
    })
  }

  // Curte um tweet
  socket.on('curtirTweet', curtirTweet)
  function curtirTweet(data) {
    let id = data.id
    fs.readFile('./tweets.json', (err, tweets) => {
      let listaTweets = JSON.parse(tweets)
      listaTweets.map(curtirPorId)
      fs.writeFile('./tweets.json', JSON.stringify(listaTweets, null, 2), (err) => {
        if (err) console.log(err)
        console.log('\nUm tweet curtido - ', id)
        io.emit('todosTweets', listaTweets)
      })
    })

    function curtirPorId(tweet) {
      if (tweet.id === id) {
        tweet.likes += 1
      }
      return tweet
    }
  }
}
