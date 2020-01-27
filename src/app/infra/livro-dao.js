class LivroDao {

  constructor(db) {
    this._db = db;
  }

  lista(callback) {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM livros',
        (erro, resultados) => {
          if (erro) return reject('Não foi possível listar os livros!');

          return resolve(resultados);
        }
      )

    });
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(`
            INSERT INTO LIVROS (
                    titulo,
                    preco,
                    descricao
                ) values (?, ?, ?)
            `,
        [
          livro.titulo,
          livro.preco,
          livro.descricao
        ],
        function (err) {
          if (err) {
            console.log(err);
            return reject('Não foi possível adicionar o livro!');
          }
          resolve();
        }
      )
    });
  }

  buscaPorId(id) {
    return new Promise((resolve, reject) => {
      this._db.get(`
            SELECT * FROM LIVROS WHERE id = ? `,
        [
          id
        ],
        (err, livro) => {
          if (err) {
            console.log(err);
            return reject('Não foi possível encontrar o livro!');
          }
          resolve(livro);
        }
      )
    });
  }

  atualiza(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(`
            UPDATE LIVROS SET
              titulo=?,
              preco=?,
              descricao=?
              WHERE ID = ? 
              
            `,
        [
          livro.titulo,
          livro.preco,
          livro.descricao,
          livro.id,
        ],
        function (err) {
          if (err) {
            console.log(err);
            return reject('Não foi possível atualizar o livro!');
          }
          resolve();
        }
      )
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run(`
            DELETE FROM LIVROS WHERE ID = ? `,
        [
          id
        ],
        function (err) {
          if (err) {
            console.log(err);
            return reject('Não foi possível encontrar o livro!');
          }
          resolve();
        }
      )
    });
  }

}

module.exports = LivroDao;