# API Tweets

API com Node.js e Socket.io para gerencianemto de tweets, agora com MongoDB.


## WEBSOCKET


### POST

* Evento "novoTweet"

``` json
{
  "usuario": {
    "nome": "Alex",
    "sobrenome": "Jr.",
    "foto": "https://cdn4.iconfinder.com/data/icons/STROKE/communications/png/400/avatar.png"
  },
  "texto": "Java é muito chato."
}
```

** Retorno no "todosTweets" com tweets atualizados


### UPDATE

* Evento "curtirTweet"

``` json
{
  "id": 12543213
}
```

** Retorno no "todosTweets" com tweets atualizados


### GET

* Evento "todosTweets"

``` json
[
  {
    "usuario": {
      "nome": "Alex",
      "sobrenome": "Jr.",
      "foto": "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png"
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
      "foto": "https://cdn4.iconfinder.com/data/icons/STROKE/communications/png/400/avatar.png"
    },
    "texto": "Json é muito simples.",
    "likes": 2,
    "data_publicacao": "2017-04-26T00:30:37.840Z",
    "id": 1493166637840
  }
]
```
