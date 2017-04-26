# API Tweets

API com Node.js e Socket.io para gerencianemto de tweets.


## WEBSOCKET


### POST

* Evento "novoTweet"

{
  "usuario": {
    "nome": "Alex",
    "sobrenome": "Jr.",
    "foto": "http://placehold.it/100x100"
  },
  "texto": "Java é muito chato."
}

** Retorno no "todosTweets" com tweets atualizados


### UPDATE

* Evento "curtirTweet"

{
  "id": 12543213
}

** Retorno no "todosTweets" com tweets atualizados


### GET

* Evento "todosTweets"

[
  {
    "usuario": {
      "nome": "Alex",
      "sobrenome": "Jr.",
      "foto": "http://placehold.it/100x100"
    },
    "texto": "Java é muito chato.",
    "likes": 3,
    "data_publicacao": "2017-04-26T00:30:33.887Z",
    "id": 1493166633887
  },
  {
    "usuario": {
      "nome": "João",
      "sobrenome": "Silva",
      "foto": "http://placehold.it/100x100"
    },
    "texto": "Json é muito simples.",
    "likes": 2,
    "data_publicacao": "2017-04-26T00:30:37.840Z",
    "id": 1493166637840
  }
]
