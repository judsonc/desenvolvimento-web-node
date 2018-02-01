const port = process.env.PORT || 3001
const io   = require('socket.io')(port) // Importação do socket.io e inicialização
console.log(`Servidor iniciado! Na porta ${port}`)

// ========= ========= ========= ========= ========= ========= ========= ========= //

const mongoose = require('mongoose')
mongoose.connect('mongodb://iotlab:iotlab@ds217898.mlab.com:17898/cursolii')
mongoose.connection.on('error', err => console.error(`MongoDB: erro na conexão - ${err.stack}`))

// ========= ========= ========= ========= ========= ========= ========= ========= //

const modelTweet = new mongoose.Schema(
  {
    usuario: {
      nome: {
        type: String,
        trim: true,
        required: true,
      },
      sobrenome: {
        type: String,
        trim: true,
        required: true,
      },
      foto: {
        type: String,
        trim: true,
        required: true,
      },
    },
    data_publicacao: {
      type: Date,
      default: Date.now,
    },
    texto: {
      type: String,
    },
    likes: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
)

const Tweet = mongoose.model('tweet', modelTweet)

// ========= ========= ========= ========= ========= ========= ========= ========= //

const sendData = async socket => {
  const listaTweets = await Tweet.find({}, { __v: 0 }).sort({ data_publicacao: -1 })
  socket.emit('todosTweets', listaTweets)
  console.log('\nTweets enviados - ', listaTweets)
}

io.on('connection', socket => {
  console.log('\nRequisição - ', new Date(), socket.id)

  // Retorna todos os tweets
  socket.on('pedirTweets', () => sendData(socket))
  
  // Insere um tweet
  socket.on('novoTweet', async data => {
    const novoTweet = new Tweet(data)
    await novoTweet.save()
    console.log('\nUm tweet inserido - ', novoTweet)
    sendData(io)
  })
  
  // Curte um tweet
  socket.on('curtirTweet', async data => {
    const tweet = await Tweet.findById(data.id)
    tweet.likes += 1
    await tweet.save()
    console.log('\nUm tweet curtido - ', data.id, tweet)
    sendData(io)
  })
})