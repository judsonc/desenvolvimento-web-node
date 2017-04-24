class Tweet {
  constructor(body) {
    this.usuario = {
  		nome: body.usuario.nome,
  		sobrenome: body.usuario.sobrenome,
  		username: body.usuario.username,
      foto: body.usuario.foto,
  	}
  	this.data_publicacao = new Date()
  	this.texto = body.texto
  	this.likes = {
  		total: body.likes.total,
  		// usuarios: body.likes.usuarios,
  	}
  }
}

module.exports = Tweet
