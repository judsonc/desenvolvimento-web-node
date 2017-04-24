// Importação do socket.io e inicialização
const io = require('socket.io')(3001)
console.log('Servidor iniciado na porta 3001!')
// importação do modelo Tweet
const Tweet = require('./model/tweet')

let listaTweets = []

io.on('connection', conectado)
function conectado(socket) {
  socket.on('action', acoes)
  function acoes(action) {
    console.log('pedido | ', new Date(), action.type, action.data)

    // Retorna todos os tweets
    if (action.type === '/get/tweets/') {
      socket.emit('action', { type: '/get/tweets/', data: listaTweets })
      console.log('tweets enviados', listaTweets)
    }

    // Insere um tweet
    if (action.type === '/post/tweet/') {
      let novoTweet = new Tweet(action.data)
      listaTweets.push(novoTweet)
      io.emit('action', { type: '/get/tweets/', data: listaTweets })
      console.log('um tweet inserido ', action.data)
    }
  }
}
