'use strict'

const fs = require('fs') // Módulo de acesso à arquivos
const io = require('socket.io')(3001) // Importação do socket.io e inicialização
console.log('Servidor iniciado na porta 3001!')

const Tweet = require('./model/tweet') // importação do modelo Tweet

io.on('connection', conectado)
function conectado(socket) {
  console.log('Requisição - ', new Date(), socket.id)

  // Retorna todos os tweets
  socket.on('pedirTweets', pedirTweets)
  function pedirTweets() {
    fs.readFile('./tweets.json', (err, tweets) => {
      let listaTweets = JSON.parse(tweets)
      socket.emit('todosTweets', listaTweets)
      console.log('tweets enviados - ', listaTweets)
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
        console.log('um tweet inserido - ', novoTweet)
        io.emit('todosTweets', listaTweets)
      })
    })
  }
}
