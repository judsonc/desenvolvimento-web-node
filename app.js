'use strict'

// Importação do socket.io e inicialização
const io = require('socket.io')(3001)
console.log('Servidor iniciado na porta 3001!')
// importação do modelo Tweet
const Tweet = require('./model/tweet')

let listaTweets = []

io.on('connection', conectado)
function conectado(socket) {
  console.log('Requisição - ', new Date(), socket.id)

  // Retorna todos os tweets
  socket.on('pedirTweets', pedirTweets)
  function pedirTweets() {
    socket.emit('todosTweets', listaTweets)
    console.log('tweets enviados - ', listaTweets)
  }

  // Insere um tweet
  socket.on('addTweet', addTweet)
  function addTweet(data) {
    let novoTweet = new Tweet(data)
    listaTweets.push(novoTweet)
    console.log('um tweet inserido ', novoTweet)
    io.emit('todosTweets - ', listaTweets)
  }
}
