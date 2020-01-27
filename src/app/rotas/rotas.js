const db = require('../../config/database');
const LivroDao = require('../infra/livro-dao');

module.exports = (app) => {

	app.get('/', (request, response) => {
		response.send(
			`
				<html>
						<head>
								<meta charset="utf-8">
						</head>
						<body>
								<h1> Casa do Código</h1>
						</body>
				</html>
			`
		)
	});

	app.get('/livros', (request, response) => {

		const livroDao = new LivroDao(db);

		livroDao.lista()
			.then(livros => response.marko(
				require('../views/livros/lista/lista.marko'),
				{
					livros: livros
				}

			))
			.catch(erro => console.log(erro));

	});

	app.get('/livros/form', function (request, response) {
		response.marko(require('../views/livros/form/form.marko'), { livro: {} }); //-- Passa um livro vazio para nao quebrar aplicação
	});

	app.get('/livros/form/:id', function (req, resp) {
		const id = req.params.id;
		const livroDao = new LivroDao(db);

		livroDao.buscaPorId(id)
			.then(livro =>
				resp.marko(
					require('../views/livros/form/form.marko'),
					{ livro: livro }
				)
			)
			.catch(erro => console.log(erro));

	});

	app.post('/livros', function (request, response) {
		console.log(request.body);

		const livroDao = new LivroDao(db);

		livroDao.adiciona(request.body)
			.then(response.redirect('/livros'))
			.catch(erro => console.log(erro));
	});

	app.put('/livros', function (request, response) {
		console.log(request.body);

		const livroDao = new LivroDao(db);

		livroDao.atualiza(request.body)
			.then(response.redirect('/livros'))
			.catch(erro => console.log(erro));
	});

	app.delete('/livros/:id', function (req, resp) {
		const id = req.params.id;

		const livroDao = new LivroDao(db);
		livroDao.remove(id)
			.then(() => resp.status(200).end())
			.catch(erro => console.log(erro));

	});

}

