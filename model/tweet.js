'use strict'

class Tweet {
  constructor(body) {
    this.usuario = {
  		nome      : body.usuario.nome,
  		sobrenome : body.usuario.sobrenome,
      foto      : body.usuario.foto,
  	}
  	this.texto = body.texto
  	this.likes = body.likes || 0
    this.data_publicacao = new Date()
    this.id = this.data_publicacao.getTime()
  }
}

module.exports = Tweet
